import { AIMatchConfigs } from './types';
import GAME_CONSTANTS from './game_constants.json';
// some temporary default configurations and parameters
export const DEFAULT_CONFIGS: AIMatchConfigs = {
  width: 16,
  height: 16,
  storeReplay: true,
  seed: undefined,
  debug: false,
  parameters: GAME_CONSTANTS.PARAMETERS,
};