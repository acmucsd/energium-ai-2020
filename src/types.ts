import { Game } from './Game';
import { Unit } from './Unit';

export interface State {
  game: Game;
  configs: AIMatchConfigs;
  rng: () => number;
}

export interface AIMatchResults {
  ranks: Array<{ rank: number; agentID: number }>;
  stats: {
    [x in number]: {
      points: number;
    };
  };
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
  };
}
