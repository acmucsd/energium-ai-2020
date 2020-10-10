import { Game } from "."
import { AIMatchConfigs } from "../types";

export const generateGame = (configs: AIMatchConfigs) => {
  const game: Game = new Game(configs);
  return game;
}