import { Game } from '.';
import { AIMatchConfigs } from '../types';

export const generateGame = (configs: AIMatchConfigs) => {
  const game: Game = new Game(configs);

  game.map.getTile(0, 0).pointsPerTurn = 4;
  game.map.getTile(15, 0).pointsPerTurn = 4;
  game.map.getTile(8, 0).pointsPerTurn = 4;
  game.map.getTile(7, 0).pointsPerTurn = 4;
  game.map.getTile(6, 0).pointsPerTurn = -4;
  game.map.getTile(9, 0).pointsPerTurn = -4;
  game.map.setBase(0, 1, 1);
  game.map.setBase(1, 14, 1);
  return game;
};
