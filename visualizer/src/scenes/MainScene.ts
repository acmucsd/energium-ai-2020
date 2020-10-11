import { State } from '@acmucsd/kingofthehill-2020/lib/es6/types';
import { DEFAULT_CONFIGS } from '@acmucsd/kingofthehill-2020/lib/es6/defaults';
import { KingOfTheHillLogic } from '@acmucsd/kingofthehill-2020/lib/es6/logic';
import { Game } from '@acmucsd/kingofthehill-2020/lib/es6/Game';
import { Unit } from '@acmucsd/kingofthehill-2020/lib/es6/Unit';
import {
  hashMapCoords,
  mapCoordsToPixels,
  mapPosToPixels,
  memorySizeOf,
} from './utils';
import { Position } from '@acmucsd/kingofthehill-2020/lib/es6/Tile/position';

export interface Frame {
  teamStates: FrameTeamStateData;
  unitData: FrameUnitData;
}

type FrameTeamStateData = {
  [x in Unit.TEAM]: {
    points: number;
  };
};
type FrameUnitData = Map<number, FrameSingleUnitData>;
export interface FrameSingleUnitData {
  pos: Position;
  team: Unit.TEAM;
  id: number;
}

export type GameCreationConfigs = {
  replayData: object;
  handleUnitClicked: HandleUnitClicked;
  handleTileClicked: HandleTileClicked;
};

type HandleUnitClicked = (unit: FrameSingleUnitData) => void;
export type FrameTileData = {
  pos: Position;
  units: Map<number, FrameSingleUnitData>;
};
type HandleTileClicked = (data: FrameTileData) => void;

class MainScene extends Phaser.Scene {
  player: Phaser.GameObjects.Sprite;
  cursors: any;

  workers: Array<Phaser.GameObjects.Sprite> = [];
  kothgame: Game;

  unitSprites: Map<number, Phaser.GameObjects.Sprite> = new Map();

  currentTurn = 0;

  dynamicLayer: Phaser.Tilemaps.DynamicTilemapLayer;

  frames: Array<Frame> = [];

  pseudomatch: any = {
    state: {},
    configs: {
      storeReplay: false,
      debug: false,
    },
    throw: () => {},
    sendAll: () => {},
    send: () => {},
    log: {
      detail: () => {},
    },
    agents: [],
  };

  map: Phaser.Tilemaps.Tilemap;

  constructor() {
    super({
      key: 'MainScene',
    });
  }

  preload() {
    this.load.tilemapTiledJSON('map', 'assets/tilemaps/desert.json');
    this.load.image('Desert', 'assets/tilemaps/tmw_desert_spacing.png');
    this.load.image('Grass', 'assets/tilemaps/ground_tileset.png');
    this.load.image('worker0', 'assets/sprites/worker0.png');
    this.load.image('worker1', 'assets/sprites/worker1.png');
    this.load.image('cart0', 'assets/sprites/cart0.png');
    this.load.image('cart1', 'assets/sprites/cart1.png');
    this.load.image('player', 'assets/sprites/mushroom.png');
  }

  private onTileClicked(v: Position) {
    const f = this.frames[this.turn];
    const unitDataAtXY: FrameUnitData = new Map();

    f.unitData.forEach((unit) => {
      if (unit.pos.x === v.x && unit.pos.y === v.y) {
        unitDataAtXY.set(unit.id, unit);
      }
    });
    const clickedPos = new Position(v.x, v.y);
    this.handleTileClicked({
      pos: clickedPos,
      units: unitDataAtXY,
    });
    this.currentSelectedTilePos = clickedPos;
  }

  loadReplayData(replayData: any): void {
    console.log(replayData)
    this.kothgame = new Game(DEFAULT_CONFIGS);
    let width = replayData.map[0].length;
    let height = replayData.map.length;
    const level = [];
    // generate the ground
    for (let y = 0; y < height; y++) {
      level.push(
        replayData.map[y].map((data) => {
          if (data.resource == null) {
            let p = Math.random();
            if (p > 0.7) return 2;
            else return 3;
          } else {
            return 3;
          }
        })
      );
    }
    this.map = this.make.tilemap({
      data: level,
      tileWidth: 16,
      tileHeight: 16,
    });
    const tileset: Phaser.Tilemaps.Tileset = this.map.addTilesetImage('Grass');
    this.map.createStaticLayer(0, tileset, 0, 0).setScale(2);
    this.input.on(
      Phaser.Input.Events.POINTER_DOWN,
      (d: { worldX: number; worldY: number }) => {
        const v = this.map.worldToTileXY(d.worldX, d.worldY);
        this.onTileClicked(new Position(v.x, v.y));
      }
    );
    this.dynamicLayer = this.map
      .createBlankDynamicLayer('resources', tileset)
      .setScale(2);

    for (let y = 0; y < height; y++) {
      // level.push(
      //   replayData.map[y].map((data, x) => {
      //   })
      // );
    }

    replayData.bases.forEach((b) => {
      this.kothgame.map.setBase(b.team, b.x, b.y);
    });

    this.cameras.main.setBounds(
      0,
      0,
      this.map.widthInPixels,
      this.map.heightInPixels
    );

    // load the initial state from replay
    this.pseudomatch.configs.preLoadedGame = this.kothgame;
    setTimeout(() => {
      KingOfTheHillLogic.initialize(this.pseudomatch).then(() => {
        this.generateGameFrames(replayData).then(() => {
          this.renderFrame(0);
          this.game.events.emit('setup');
        });
      });
    }, 1000);
  }

  /**
   * Creates a snapshot of the game state
   * @param game
   */
  createFrame(game: Game): Frame {
    const teamStates: FrameTeamStateData = {
      [Unit.TEAM.A]: {
        points: game.state.teamStates[Unit.TEAM.A].points,
      },
      [Unit.TEAM.B]: {
        points: game.state.teamStates[Unit.TEAM.B].points,
      },
    };

    const unitData: FrameUnitData = new Map();
    [
      ...Array.from(game.getTeamsUnits(Unit.TEAM.A).values()),
      ...Array.from(game.getTeamsUnits(Unit.TEAM.B).values()),
    ].forEach((unit) => {
      unitData.set(unit.id, {
        team: unit.team,
        id: unit.id,
        pos: unit.pos,
      });
    });

    return {
      unitData,
      teamStates,
    };
  }

  public turn = 0;

  public handleUnitClicked: HandleUnitClicked;
  public handleTileClicked: HandleTileClicked;

  public currentSelectedTilePos: Position = null;

  create(configs: GameCreationConfigs) {
    console.log(configs);
    this.loadReplayData(configs.replayData);
    this.handleUnitClicked = configs.handleUnitClicked;
    this.handleTileClicked = configs.handleTileClicked;
    this.events.emit('created');
  }

  addUnitSprite(x: number, y: number, team: Unit.TEAM, id: number) {
    const p = mapCoordsToPixels(x, y);
    const sprite = this.add.sprite(p[0], p[1], 'worker' + team).setScale(1.5);
    this.unitSprites.set(id, sprite);
    return sprite;
  }

  renderFrame(turn: number) {
    this.turn = turn;
    const f = this.frames[turn];
    if (!f) {
      return;
    }

    let visibleUnits: Set<number> = new Set();
    f.unitData.forEach((data) => {
      const id = data.id;
      const sprite = this.unitSprites.get(id);
      sprite.setVisible(true);
      const p = mapPosToPixels(data.pos);
      sprite.x = p[0];
      sprite.y = p[1];
      visibleUnits.add(id);
    });
    this.unitSprites.forEach((sprite, key) => {
      if (!visibleUnits.has(key)) {
        sprite.setVisible(false);
      }
    });

    if (this.currentSelectedTilePos !== null) {
      this.onTileClicked(this.currentSelectedTilePos);
    }
  }

  async generateGameFrames(replayData) {
    while (this.currentTurn <= this.kothgame.configs.parameters.MAX_TURNS) {
      const commands = replayData.allCommands[this.currentTurn];
      const state: State = this.pseudomatch.state;
      const game = state.game;

      await KingOfTheHillLogic.update(this.pseudomatch, commands);

      [
        ...Array.from(game.getTeamsUnits(Unit.TEAM.A).values()),
        ...Array.from(game.getTeamsUnits(Unit.TEAM.B).values()),
      ].forEach((unit) => {
        if (this.unitSprites.has(unit.id)) {
          // const sprite = this.unitSprites.get(unit.id);
          // const p = mapPosToPixels(unit.pos);
          // this.tweens.add({
          //   targets: sprite,
          //   x: p[0],
          //   y: p[1],
          //   ease: 'Linear',
          //   duration: 100,
          //   repeat: 0,
          //   yoyo: false,
          // });
        } else {
          this.addUnitSprite(
            unit.pos.x,
            unit.pos.y,
            unit.team,
            unit.id
          ).setVisible(false);
        }
      });

      const frame = this.createFrame(this.pseudomatch.state.game);
      // console.log(
      //   { turn: this.currentTurn },
      //   'frame size',
      //   memorySizeOf(frame)
      // );
      this.frames.push(frame);
      this.currentTurn++;
    }
  }
  update(time: number, delta: number) {}
}

export default MainScene;
