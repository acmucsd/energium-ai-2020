import { Game } from '.';
import seedrandom from 'seedrandom';
import { DEFAULT_CONFIGS } from '../defaults';
import { GameMap } from '../GameMap';
import { AIMatchConfigs } from '../types';

const sizes = [16, 20, 24, 28, 32];

export const generateGame = (configs: AIMatchConfigs, rng: () => number) => {
  const game: Game = new Game(configs);
  game.rng = rng;
  generateRandomMap(game);
  return game;
};
// generates gaussian given x, sigma, mu
export const gaussian = (x: number, sigma: number, mu: number) => {
  return (
    (1 / (sigma * Math.sqrt(2 * Math.PI))) *
    Math.exp(-0.5 * (-Math.pow(x - mu, 2) / (sigma * sigma)))
  );
};

// perform convolution, expect kernel to be square matrix of odd rows and columns
export const convolveMap = (map: number[][], kernel: number[][]) => {
  const padding = Math.floor(kernel.length / 2);
  const convolved = [];
  for (let y = padding; y < map.length - padding; y++) {
    convolved.push(new Array(map.length - 2 * padding));
    for (let x = padding; x < map[0].length - padding; x++) {
      let weighted = 0;
      for (let i = 0; i < kernel.length; i++) {
        for (let j = 0; j < kernel[0].length; j++) {
          const dx = j - padding;
          const dy = i - padding;
          weighted += map[y + dy][x + dx] * kernel[i][j];
        }
      }
      convolved[y - padding][x - padding] = weighted;
    }
  }
  return convolved;
};

enum Symmetry {
  VERTICAL,
  HORIZONTAL,
  DIAGONAL,
}

/**
 * Generation Method
 *
 * First make random gaussian noise using a random number from -0.25 to 0.75 for each tile (with padding)
 *
 * Convolve the map with a 3x3 kernel filter
 *
 * Smooth it out and round numbers
 *
 */
export const generateRandomMap = (game: Game) => {
  const bases = [1, 2][Math.floor(game.rng() * 2)];
  const peaks = 1;

  let mapWidth = 0;
  let mapHeight = 0;
  if (game.configs.width == 0 && game.configs.height == 0) {
    mapWidth = sizes[Math.floor(game.rng() * sizes.length)];
    mapHeight = mapWidth;
  }

  let symmetry = Symmetry.VERTICAL;
  let sym_p = game.rng();
  if (sym_p < 0.33) {
    symmetry = Symmetry.HORIZONTAL;
  } else if (sym_p < 0.86) {
    symmetry = Symmetry.DIAGONAL;
  }
  let width = mapWidth;
  let height = mapHeight / 2;
  if (symmetry === Symmetry.HORIZONTAL) {
    width = mapWidth / 2;
    height = mapHeight;
  } else if (symmetry === Symmetry.DIAGONAL) {
    width = mapWidth / 2;
    height = mapHeight / 2;
  }
  const kernel = [
    [1, -1, 1],
    [0.5, 1, 0.5],
    [1, -1, 1],
  ];
  const kernelPadding = Math.floor(kernel.length / 2);
  const gaussianMap = [];
  for (let y = 0; y < height + kernelPadding * 2; y++) {
    gaussianMap.push(new Array(width + kernelPadding * 2));
    for (let x = 0; x < width + kernelPadding * 2; x++) {
      // lean towards outputting positives
      let p = game.rng() - 0.3;
      const sgn = Math.sign(p);
      if (game.rng() < 0.95) {
        gaussianMap[y][x] = 0;
      } else {
        gaussianMap[y][x] = sgn * gaussian(p, 0.3, 0) * 0.5;
      }
    }
  }

  const transposedMap = [];
  for (let y = 0; y < mapHeight + kernelPadding * 2; y++) {
    transposedMap.push(new Array(mapWidth));
    for (let x = 0; x < mapWidth + kernelPadding * 2; x++) {
      let rx = x;
      let ry = y;
      if (symmetry === Symmetry.VERTICAL || symmetry === Symmetry.DIAGONAL) {
        if (ry >= height + kernelPadding) {
          ry = height - (ry - height - kernelPadding);
        }
      }
      if (symmetry === Symmetry.HORIZONTAL || symmetry === Symmetry.DIAGONAL) {
        if (rx >= width + kernelPadding) {
          rx = width - (rx - width - kernelPadding);
        }
      }
      transposedMap[y][x] = gaussianMap[ry][rx];
    }
  }

  const convolved = convolveMap(transposedMap, kernel);
  // console.log(convolved);

  game.map = new GameMap(mapWidth, mapHeight);
  for (let y = 0; y < game.map.height; y++) {
    for (let x = 0; x < game.map.width; x++) {
      game.map.getTile(x, y).pointsPerTurn = Math.floor(convolved[y][x]);
    }
  }

  const getBases4Pos = () => {
    return [width / 4, mapWidth - width / 4 - 1];
  };

  if (symmetry === Symmetry.HORIZONTAL) {
    if (bases === 1) {
      game.map.setBase(0, width / 2, height / 2);
      game.map.setBase(1, mapWidth - width / 2 - 1, height / 2);
    } else if (bases === 2) {
      game.map.setBase(0, width / 2, height / 4);
      game.map.setBase(0, width / 2, mapHeight - height / 4 - 1);
      game.map.setBase(1, mapWidth - width / 2 - 1, height / 4);
      game.map.setBase(1, mapWidth - width / 2 - 1, mapHeight - height / 4 - 1);
    }
  } else if (symmetry === Symmetry.VERTICAL) {
    if (bases === 1) {
      game.map.setBase(0, width / 2, height / 2);
      game.map.setBase(1, width / 2, mapHeight - height / 2 - 1);
    } else if (bases === 2) {
      const b = getBases4Pos();
      game.map.setBase(0, b[0], height / 2);
      game.map.setBase(0, b[1], height / 2);
      game.map.setBase(1, b[0], mapHeight - height / 2 - 1);
      game.map.setBase(1, b[1], mapHeight - height / 2 - 1);
    }
  } else if (symmetry === Symmetry.DIAGONAL) {
    if (bases === 1) {
      game.map.setBase(0, width / 2, height / 2);
      game.map.setBase(1, mapWidth - width / 2 - 1, mapHeight - height / 2 - 1);
    } else if (bases === 2) {
      game.map.setBase(0, width / 2, height / 2);
      game.map.setBase(0, mapWidth - width / 2 - 1, mapHeight - height / 2 - 1);
      game.map.setBase(1, width / 2, mapHeight - height / 2 - 1);
      game.map.setBase(1, mapWidth - width / 2 - 1, height / 2);
    }
  }

  // console.log(game.map.getMapString());
};
// generateGame(DEFAULT_CONFIGS, Math.random);
