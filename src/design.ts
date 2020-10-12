import { Tournament } from 'dimensions-ai/lib/main/Tournament';
import { Design } from 'dimensions-ai/lib/main/Design';
import { Match } from 'dimensions-ai/lib/main/Match';
import { MatchEngine } from 'dimensions-ai/lib/main/MatchEngine';
import { EnergiumLogic } from './logic';
import { AIMatchResults, State } from './types';
import { Unit } from './Unit';

export class EnergiumDesign extends Design {
  async initialize(match: Match): Promise<void> {
    return EnergiumLogic.initialize(match);
  }
  async update(
    match: Match,
    commands: Array<MatchEngine.Command>
  ): Promise<Match.Status> {
    return EnergiumLogic.update(match, commands);
  }

  async getResults(match: Match): Promise<AIMatchResults> {
    const state: State = match.state;
    const game = state.game;
    let winningTeam = Unit.TEAM.A;
    let losingTeam = Unit.TEAM.B;
    let teamAPts = game.state.teamStates[Unit.TEAM.A].points;
    let teamBPts = game.state.teamStates[Unit.TEAM.B].points;

    if (match.agents[Unit.TEAM.A].isTerminated()) {
      teamAPts = 0;
    }
    if (match.agents[Unit.TEAM.B].isTerminated()) {
      teamBPts = 0;
    }

    let otherData = {
      stats: {
        [Unit.TEAM.A]: {
          points: teamAPts,
          terminated: match.agents[Unit.TEAM.A].isTerminated(),
          name: match.agents[Unit.TEAM.A].name,
        },
        [Unit.TEAM.B]: {
          points: teamBPts,
          terminated: match.agents[Unit.TEAM.B].isTerminated(),
          name: match.agents[Unit.TEAM.B].name,
        },
        seed: state.configs.seed,
        turnsElapsed: game.state.turn,
      },
    };

    if (teamBPts > teamAPts) {
      winningTeam = Unit.TEAM.B;
      losingTeam = Unit.TEAM.A;
    } else if (teamBPts === teamAPts) {
      // a tie
      return {
        ranks: [
          {
            rank: 1,
            agentID: 0,
          },
          {
            rank: 1,
            agentID: 1,
          },
        ],
        ...otherData,
      };
    }
    return {
      ranks: [
        {
          rank: 1,
          agentID: winningTeam,
        },
        {
          rank: 2,
          agentID: losingTeam,
        },
      ],
      ...otherData,
    };
  }
  static resultHandler(results: AIMatchResults): Tournament.RankSystem.Results {
    const rankings = [];
    for (let i = 0; i < results.ranks.length; i++) {
      const info = results.ranks[i];
      rankings.push({ rank: info.rank, agentID: info.agentID });
    }
    return { ranks: rankings };
  }
}
