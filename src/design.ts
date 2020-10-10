import { Design, Match, MatchEngine } from 'dimensions-ai';
import { Game } from './Game';
import { KingOfTheHillLogic } from './logic';
import { State } from './types';

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
  async getResults(match: Match): Promise<void> {}
}
