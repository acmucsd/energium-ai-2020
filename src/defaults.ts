import { AIMatchConfigs } from './types';
import GAME_CONSTANTS from './game_constants.json';
// some temporary default configurations and parameters
export const DEFAULT_CONFIGS: AIMatchConfigs = {
  width: 0,
  height: 0,
  storeReplay: true,
  seed: undefined,
  debug: false,
  debugDelay: 100,
  parameters: GAME_CONSTANTS.PARAMETERS,
};
