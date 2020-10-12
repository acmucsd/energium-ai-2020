import 'phaser';

import MainScene, { GameCreationConfigs } from '../scenes/MainScene';

export const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  parent: 'content',
  width: 640,
  height: 640,
  zoom: 0.5,
  render: {
    pixelArt: true,
  },
  backgroundColor: '#EDEEC9',
  scene: [],
};

export const createGame = (configs: GameCreationConfigs): Phaser.Game => {
  const mapWidth = configs.replayData.map[0].length;
  config.width = 32 * mapWidth;
    config.height = 32 * mapWidth;
  if (mapWidth <= 16) {
    config.zoom = 1;
  } else {
    config.zoom = 0.5
    config.width = 32 * mapWidth;
    config.height = 32 * mapWidth;
  }
  
  const game = new Phaser.Game(config);
  game.scene.add('MainScene', MainScene, true, configs);
  return game;
};
