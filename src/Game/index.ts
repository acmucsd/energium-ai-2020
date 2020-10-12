import { Match } from 'dimensions-ai/lib/main/Match';
import { MatchWarn } from 'dimensions-ai/lib/main/DimensionError';
import { MatchEngine } from 'dimensions-ai/lib/main/MatchEngine';
import { MoveAction, SpawnAction, Action } from '../Actions';
import { GameMap } from '../GameMap';
import { Replay } from '../Replay';
import { Tile } from '../Tile';
import { Position } from '../Tile/position';
import { AIMatchConfigs } from '../types';
import { Unit } from '../Unit';

export class Game {
  public replay: Replay;
  public map: GameMap;
  public rng: () => number = Math.random;
  private globalUnitIDCount = 0;
  public state: Game.State = {
    turn: 0,
    teamStates: {
      [Unit.TEAM.A]: {
        units: new Map(),
        points: 0,
      },
      [Unit.TEAM.B]: {
        units: new Map(),
        points: 0,
      },
    },
  };
  constructor(public configs: AIMatchConfigs) {
    Unit.ALL_TEAMS.forEach((team) => {
      this.state.teamStates[team].points = configs.parameters.INITIAL_POINTS;
    });
  }

  validateCommand(cmd: MatchEngine.Command): Action {
    const strs = cmd.command.split(' ');
    if (strs.length === 0) {
      throw new MatchWarn(
        `Agent ${cmd.agentID} sent malformed command: ${cmd.command}`
      );
    } else {
      const action = strs[0];
      let valid = true;
      const team: Unit.TEAM = cmd.agentID;
      let errormsg = `Team ${cmd.agentID} sent invalid command`;
      switch (action) {
        case Game.ACTIONS.MOVE:
          if (strs.length === 3) {
            const unitid = parseInt(strs[1]);
            const direction = strs[2];
            const teamState = this.state.teamStates[team];
            if (!teamState.units.has(unitid)) {
              valid = false;
              errormsg = `Team ${cmd.agentID} tried to move unit ${unitid} that it does not own`;
              break;
            }
            const unit = teamState.units.get(unitid);
            switch (direction) {
              case Game.DIRECTIONS.NORTH:
              case Game.DIRECTIONS.EAST:
              case Game.DIRECTIONS.SOUTH:
              case Game.DIRECTIONS.WEST: {
                const newpos = unit.pos.translate(direction, 1);
                if (!this.map.inMap(newpos)) {
                  errormsg = `Team ${cmd.agentID} tried to move unit ${unitid} off map`;
                  valid = false;
                }
                break;
              }
              default:
                errormsg = `Team ${cmd.agentID} tried to move unit ${unitid} in invalid direction ${direction}`;
                valid = false;
                break;
            }
            if (valid) {
              return new MoveAction(
                action,
                team,
                unitid,
                direction as Game.DIRECTIONS
              );
            }
          } else {
            valid = false;
          }
          break;
        case Game.ACTIONS.CREATE_UNIT:
          if (strs.length === 3) {
            const x = parseInt(strs[1]);
            const y = parseInt(strs[2]);
            if (isNaN(x) || isNaN(y)) {
              valid = false;
              errormsg = `Team ${cmd.agentID} tried to build unit with invalid coordinates`;
              break;
            }
            // check if tile being built is a owned base
            const tile = this.map.getTile(x, y);
            if (!tile.isBaseTile() || tile.baseTeam !== team) {
              // invalid if not a city or not owned
              valid = false;
              errormsg = `Team ${cmd.agentID} tried to build unit on tile (${x}, ${y}) that does not have a base or is not owned`;
              break;
            }
            if (valid) {
              return new SpawnAction(action, team, x, y);
            }
          } else {
            valid = false;
          }
          break;
      }
      if (valid === false) {
        throw new MatchWarn(
          errormsg + `; turn ${this.state.turn}; cmd: ${cmd.command}`
        );
      }
    }
  }

  getTeamsUnits(team: Unit.TEAM): Map<Unit.ID, Unit> {
    return this.state.teamStates[team].units;
  }

  getUnit(team: Unit.TEAM, unitid: Unit.ID): Unit {
    return this.state.teamStates[team].units.get(unitid);
  }
  moveUnit(team: Unit.TEAM, unitid: Unit.ID, direction: Game.DIRECTIONS): void {
    const unit = this.getUnit(team, unitid);
    // remove unit from old cell and move to new one and update unit pos
    this.map.getTileByPos(unit.pos).units.delete(unit.id);
    unit.pos = unit.pos.translate(direction, 1);
    this.map.getTileByPos(unit.pos).units.set(unit.id, unit);
  }
  spawnUnit(team: Unit.TEAM, pos: Position): void {
    const tile = this.map.getTileByPos(pos);
    const unit = new Unit(team, this.globalUnitIDCount++, pos);
    tile.units.set(unit.id, unit);
    this.state.teamStates[team].units.set(unit.id, unit);
  }
  destroyUnit(team: Unit.TEAM, unitid: Unit.ID): void {
    const unit = this.getUnit(team, unitid);
    this.map.getTileByPos(unit.pos).units.delete(unitid);
    this.state.teamStates[team].units.delete(unitid);
  }

  // spawn all units asked to be spawn
  handleSpawnActions(
    actions: Array<SpawnAction>,
    match: Match
  ): Set<Tile> {
    const spawnedPositionsHashes: Set<number> = new Set();
    const spawnedPositions: Set<Tile> = new Set();

    const UNIT_COST = this.configs.parameters.UNIT_COST;
    actions.forEach((action) => {
      // check first if points available to use
      if (this.state.teamStates[action.team].points >= UNIT_COST) {
        this.spawnUnit(action.team, action.pos);
        this.state.teamStates[action.team].points -= UNIT_COST;
        if (!spawnedPositionsHashes.has(action.pos.hash())) {
          spawnedPositionsHashes.add(action.pos.hash());
          spawnedPositions.add(this.map.getTileByPos(action.pos));
        }
      } else {
        match.log.warn(
          `Team ${action.team} does not have enough points to spawn another unit; turn ${this.state.turn}`
        );
      }
    });

    return spawnedPositions;
  }
  // move all units and then destroy any that collide
  handleMovementActions(actions: Array<MoveAction>, match: Match): Set<Tile> {
    const tilesWithNewUnits: Set<Tile> = new Set();
    const idsOfUnitsThatMoved: Set<Unit.ID> = new Set();
    actions.forEach((action) => {
      if (idsOfUnitsThatMoved.has(action.unitid)) {
        match.log.warn(
          `Team ${action.team}'s unit ${action.unitid} already moved, cannot move again this turn; turn ${this.state.turn}`
        );
      } else {
        this.moveUnit(action.team, action.unitid, action.direction);
        const unit = this.getUnit(action.team, action.unitid);
        const tile = this.map.getTileByPos(unit.pos);
        tilesWithNewUnits.add(tile);
        idsOfUnitsThatMoved.add(action.unitid);
      }
    });

    return tilesWithNewUnits;
  }

  handleCollisions(tilesToCheck: Set<Tile>, match: Match): void {
    const unitsToRemove: Array<{unit: Unit, tile: Tile}> = [];
    tilesToCheck.forEach((tile) => {
      if (tile.units.size > 1) {
        // find lowest brokendown unit
        // remove all units as they collided
        let lowestBreakdown = 999999;
        let lowestBreakdownUnits = 1;
        tile.units.forEach((unit) => {
          const b = unit.getBreakdownLevel(this.state.turn, this.configs.parameters.BREAKDOWN_TURNS);
          if (b < lowestBreakdown) {
            lowestBreakdown = b;
            lowestBreakdownUnits = 1;
          } else if (b == lowestBreakdown) {
            lowestBreakdownUnits++;
          }
        });
        tile.units.forEach((unit) => {
          if (lowestBreakdownUnits > 1) {
            // all get removed
            unitsToRemove.push({unit, tile});
          } else {
            const b = unit.getBreakdownLevel(this.state.turn, this.configs.parameters.BREAKDOWN_TURNS);
            if (b > lowestBreakdown) {
              unitsToRemove.push({unit, tile});
            }
          }
        });
      }
    });
    for (const {unit, tile} of unitsToRemove) {
      match.log.warn(`Team ${unit.team}'s unit ${unit.id} collided at ${tile.pos.toString()} on turn ${this.state.turn}`);
      this.destroyUnit(unit.team, unit.id);
    }
  }

  // give all units points depending on their tile
  handlePointsRelease(): void {
    Unit.ALL_TEAMS.forEach((team) => {
      const units = this.getTeamsUnits(team);
      units.forEach((unit) => {
        const tile = this.map.getTileByPos(unit.pos);
        this.state.teamStates[team].points += tile.pointsPerTurn;
      });
    });
  }
  // run after movements and collisions are handled
  handleRepairs(): void {
    this.map.bases.forEach((b) => {
      const tile = this.map.getTileByPos(b.pos);
      tile.units.forEach((unit) => {
        if (b.team === unit.team) {
          unit.lastRepairTurn = this.state.turn;
        }
      });
    });
  }
  handleBreakdown(match: Match): void {
    const brokenDownUnits: Array<Unit> = [];
    Unit.ALL_TEAMS.forEach((team) => {
      const units = this.getTeamsUnits(team);
      units.forEach((unit) => {
        const b = unit.getBreakdownLevel(this.state.turn, this.configs.parameters.BREAKDOWN_TURNS);
        if (b >= this.configs.parameters.BREAKDOWN_MAX) {
          brokenDownUnits.push(unit);
        }
      });
    });
    brokenDownUnits.forEach((unit) => {
      match.log.warn(`Team ${unit.team}'s unit ${unit.id} broke down`);
      this.destroyUnit(unit.team, unit.id);
    });
  }
}

export namespace Game {
  export interface State {
    turn: 0;
    teamStates: {
      [x in Unit.TEAM]: {
        units: Map<Unit.ID, Unit>;
        points: number;
      };
    };
  }
  export enum DIRECTIONS {
    NORTH = 'n',
    EAST = 'e',
    SOUTH = 's',
    WEST = 'w',
  }
  export enum ACTIONS {
    /**
     * formatted as `m unitid direction`
     */
    MOVE = 'm',
    /**
     * formatted as `c x y`
     */
    CREATE_UNIT = 'c',
  }
}
