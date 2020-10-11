import {Design} from 'dimensions-ai/lib/main/Design';
import {Match} from 'dimensions-ai/lib/main/Match';
import {MatchEngine} from 'dimensions-ai/lib/main/MatchEngine';
import { KingOfTheHillLogic } from './logic';
import { AIMatchResults, State } from './types';
import { Unit } from './Unit';

export class KingOfTheHillDesign extends Design {
  async initialize(match: Match): Promise<void> {
    return KingOfTheHillLogic.initialize(match);
  }
  async update(
    match: Match,
    commands: Array<MatchEngine.Command>
  ): Promise<Match.Status> {
    return KingOfTheHillLogic.update(match, commands);
  }
  async getResults(match: Match): Promise<AIMatchResults> {
    const state: State = match.state;
    const game = state.game;
    let winningTeam = Unit.TEAM.A;
    let losingTeam = Unit.TEAM.B;
    let teamAPts = game.state.teamStates[Unit.TEAM.A].points;
    let teamBPts = game.state.teamStates[Unit.TEAM.B].points;

    let otherData = {
      stats: {
        [Unit.TEAM.A]: {
          points: teamAPts,
        },
        [Unit.TEAM.B]: {
          points: teamBPts,
        },
      },
    };

    if (teamBPts > teamAPts) {
      winningTeam = Unit.TEAM.B;
      losingTeam = Unit.TEAM.A;
    } else {
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
}
