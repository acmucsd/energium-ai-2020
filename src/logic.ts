import {Match} from 'dimensions-ai/lib/main/Match';
import {MatchEngine} from 'dimensions-ai/lib/main/MatchEngine';
import { State } from './types';
import { deepCopy, deepMerge, sleep } from './utils';
import seedrandom from 'seedrandom';
import { DEFAULT_CONFIGS } from './defaults';
import { Game } from './Game';
import { generateGame } from './Game/gen';
import { Replay } from './Replay';
import { Unit } from './Unit';
import { Action, MoveAction, SpawnAction } from './Actions';

export class KingOfTheHillLogic {
  static async initialize(match: Match): Promise<void> {
    const state: State = {
      configs: deepCopy(DEFAULT_CONFIGS),
      game: null,
      rng: seedrandom(`${Math.random()}`),
    };
    state.configs = deepMerge(state.configs, match.configs);
    if (state.configs.seed !== undefined) {
      state.rng = seedrandom(`${state.configs.seed}`);
    }
    let game: Game;
    game = generateGame(state.configs);
    state.game = game;
    if (state.configs.storeReplay) {
      game.replay = new Replay(match);
    }
    match.log.detail(state.configs);
    // store the state into the match so it can be used again in `update` and `getResults`
    match.state = state;

    if (game.replay) {
      game.replay.writeMap(state.game.map);
    }

    for (let i = 0; i < match.agents.length; i++) {
      const agentID = match.agents[i].id;
      await match.send(`${agentID}`, agentID);
    }
    // send all agents the current map width and height
    // `width height` - width and height of the map
    await match.sendAll(`${state.game.map.width} ${state.game.map.height}`);

    // send all agents base locations and nonzero points locs
    const map =state.game.map;
    for (const base of map.bases) {
      await match.sendAll(`b ${base.team} ${base.pos.x} ${base.pos.y}`);
    }
    const tileMessages: Array<Promise<boolean>> = [];
    for (let y = 0; y < map.height; y++) {
      for (let x = 0; x < map.width; x++) {
        const tile = map.getTile(x, y);
        if (tile.pointsPerTurn > 0) {
          tileMessages.push(match.sendAll(`t ${tile.pos.x} ${tile.pos.y} ${tile.pointsPerTurn}`));
        }
      }
    }
    
    await Promise.all(tileMessages);

    await this.sendAllAgentsGameInformation(match);
    await match.sendAll('D_DONE');
  }

  /**
   * Send game info as so
   *
   * p {team} {pts} - number of points the team has
   *
   * u {team} {id} {x} {y} - unit of that team with that id at x y
   */
  static async sendAllAgentsGameInformation(match: Match): Promise<void> {
    const state: State = match.state;
    const game = state.game;

    const promises: Array<Promise<boolean>> = [];
    const teams = [Unit.TEAM.A, Unit.TEAM.B];

    // send points
    teams.forEach((team) => {
      const pts = game.state.teamStates[team].points;
      promises.push(match.sendAll(`p ${team} ${pts}`));
    });

    teams.forEach((team) => {
      const units = game.state.teamStates[team].units;
      units.forEach((unit) => {
        promises.push(
          match.sendAll(`u ${unit.team} ${unit.id} ${unit.pos.x} ${unit.pos.y}`)
        );
      });
    });
    await Promise.all(promises);
  }
  static async update(
    match: Match,
    commands: Array<MatchEngine.Command>
  ): Promise<Match.Status> {
    const state: State = match.state;
    const game = state.game;
    match.log.detail('Processing turn ' + game.state.turn);
    if (game.replay) {
      game.replay.data.allCommands.push(commands);
    }
    const agentsTerminated = [false, false];
    match.agents.forEach((agent) => {
      // FRONTEND needs to pass in psuedo isTerminated() function that returns true on the turn an agent terminated itself
      if (agent.isTerminated()) {
        agentsTerminated[agent.id] = true;
        game.state.teamStates[agent.id].points = 0;
      }
    });
    // if agent terminated, set all terminated agents scores to 0
    if (agentsTerminated[0] || agentsTerminated[1]) {
      return Match.Status.FINISHED;
    }

    // loop over commands and validate and map into internal action representations
    const actionsMap: Map<Game.ACTIONS, Array<Action>> = new Map();
    Object.values(Game.ACTIONS).forEach((val) => {
      actionsMap.set(val, []);
    });
    for (let i = 0; i < commands.length; i++) {
      // get the command and the agent that issued it and handle appropriately
      const agentID = commands[i].agentID;
      try {
        const action = game.validateCommand(
          commands[i]
        );
        // TODO: this might be slow, depends on its optimized and compiled
        const newactionArray = [...actionsMap.get(action.action), action];
        actionsMap.set(action.action, newactionArray);
      } catch (err) {
        match.throw(agentID, err);
      }
    }
    game.handleSpawnActions(actionsMap.get(Game.ACTIONS.CREATE_UNIT) as SpawnAction[], match);
    game.handleMovementActions(actionsMap.get(Game.ACTIONS.MOVE) as MoveAction[], match);
    game.handlePointsRelease();
    await this.sendAllAgentsGameInformation(match);

    return Match.Status.FINISHED;
  }
  static async getResults(match: Match): Promise<void> {}
}
