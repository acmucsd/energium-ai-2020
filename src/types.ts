import { Game } from './Game';

export interface State {
  game: Game;
  configs: AIMatchConfigs;
  rng: () => number;
}

export interface AIMatchConfigs {
  storeReplay: boolean;
  width: number;
  height: number;
  debug?: boolean;
  seed: number | undefined;
  parameters: {
    UNIT_COST: number;
    MAX_TURNS: number;
  }
}