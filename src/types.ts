import { Game } from './Game';
import { Unit } from './Unit';

export interface State {
  game: Game;
  configs: AIMatchConfigs;
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
  debugDelay: number;
  seed: number | undefined;
  compressReplay: boolean;
  parameters: {
    UNIT_COST: number;
    MAX_TURNS: number;
    INITIAL_POINTS: number;
    BREAKDOWN_TURNS: number;
    BREAKDOWN_MAX: number;
  };
}
