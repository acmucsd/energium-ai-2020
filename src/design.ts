import { Design, Match } from 'dimensions-ai';
import { Game } from './Game';
import { State } from './types';

export class NameDesign extends Design {
  async initialize(match: Match): Promise<void> {
    match.state.game = new Game();
  }
  async update(match: Match): Promise<Match.Status> {
    const state: State = match.state;
    if (this.gameOver(state.game)) {
      return Match.Status.FINISHED;
    }
    return;
  }
  gameOver(game: Game): boolean {
    if (game.turn > 200) {
      return true;
    }
    return false;
  }
  async getResults(match: Match): Promise<void> {}
}
