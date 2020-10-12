import { State } from '@acmucsd/energium-2020/lib/es6/types';
import { DEFAULT_CONFIGS } from '@acmucsd/energium-2020/lib/es6/defaults';
import { EnergiumLogic } from '@acmucsd/energium-2020/lib/es6/logic';
import { Game } from '@acmucsd/energium-2020/lib/es6/Game';
import { Unit } from '@acmucsd/energium-2020/lib/es6/Unit';
import {
  hashMapCoords,
  mapCoordsToPixels,
  mapPosToPixels,
  memorySizeOf,
} from './utils';
import { Position } from '@acmucsd/energium-2020/lib/es6/Tile/position';
import { GameMap } from '@acmucsd/energium-2020/lib/es6/GameMap';
import { TILE_MAPPING } from './tileMapping';

export interface Frame {
  teamStates: FrameTeamStateData;
  unitData: FrameUnitData;
  errors: string[];
  commands: any[];
}

type FrameTeamStateData = {
  [x in Unit.TEAM]: {
    points: number;
    unitCount: number;
  };
};
type FrameUnitData = Map<number, FrameSingleUnitData>;
export interface FrameSingleUnitData {
  pos: Position;
  team: Unit.TEAM;
  id: number;
  lastRepaired: number;
  breakdownLevel: number;
}

export type GameCreationConfigs = {
  replayData: object;
  handleTileClicked: HandleTileClicked;
};

export type FrameTileData = {
  pos: Position;
  units: Map<number, FrameSingleUnitData>;
  pointsPerTurn: number;
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

  currentTurnErrors: Array<string> = [];

  pseudomatch: any = {
    state: {},
    configs: {
      storeReplay: false,
      debug: false,
    },
    throw: (id, err) => {
      this.currentTurnErrors.push(`Team ${id} - ${err}`);
    },
    sendAll: () => {},
    send: () => {},
    log: {
      detail: () => {},
      warn: (m) => {
        this.currentTurnErrors.push(m);
      },
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
    this.load.image('space', 'assets/tilemaps/kothtiles.png');
    this.load.image('worker0', 'assets/sprites/worker0.png');
    this.load.image('worker1', 'assets/sprites/worker1.png');
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
      pointsPerTurn: this.replayData.map[v.y][v.x].ppt
    });
    this.currentSelectedTilePos = clickedPos;
  }


  getTileIndexForPoints(pts: number) { 
    if (pts === 0) {
      return 5;
    }
    if (pts < 0) {
      return Math.min(5 - Math.round(pts / 2), 19);
    }
    if (pts > 0) {
      return Math.max(5 - Math.round(pts / 2), 1);
    }
  }

  replayData: any;
  text: any[] = [];
  showTextOverlay = false;
  toggleTextOverlay(): void {
    this.showTextOverlay = !this.showTextOverlay;
    this.text.forEach((a) => {
      a.setVisible(this.showTextOverlay);
    });
  }
  loadReplayData(replayData: any): void {
    this.replayData = replayData;
    this.kothgame = new Game(DEFAULT_CONFIGS);
    
    let width = replayData.map[0].length;
    let height = replayData.map.length;
    this.kothgame.map = new GameMap(width, height);
    this.replayData.bases.forEach((b) => {
      this.kothgame.map.setBase(b.team, b.x, b.y);
    });
    const level = [];
    for (let y = 0; y < height; y++) {
      level.push([]);
      for (let x = 0; x < width; x++) {
        // const c = [4, 14, 15, 16][Math.floor(Math.random() *  4)];
        const c = this.getTileIndexForPoints(replayData.map[y][x].ppt);
        level[y].push(c);
      }
    }
    this.map = this.make.tilemap({
      data: level,
      tileWidth: 8,
      tileHeight: 8,
    });
    const tileset: Phaser.Tilemaps.Tileset = this.map.addTilesetImage('space');
    this.map.createStaticLayer(0, tileset, 0, 0).setScale(4);
    this.input.on(
      Phaser.Input.Events.POINTER_DOWN,
      (d: { worldX: number; worldY: number }) => {
        const v = this.map.worldToTileXY(d.worldX, d.worldY);
        this.onTileClicked(new Position(v.x, v.y));
      }
    );
    this.dynamicLayer = this.map
      .createBlankDynamicLayer('bases', tileset)
      .setScale(4);

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const pixels = mapPosToPixels(new Position(x, y))
        const text = this.add.text(pixels[0] - 8, pixels[1] - 8, replayData.map[y][x].ppt)
        text.setVisible(false);
        this.text.push(text);
      }
    }

    this.cameras.main.setBounds(
      0,
      0,
      this.map.widthInPixels,
      this.map.heightInPixels
    );

    // load the initial state from replay
    // this.pseudomatch.configs.preLoadedGame = this.kothgame;
    this.pseudomatch.configs.seed = this.replayData.seed;
    // setTimeout(() => {
      EnergiumLogic.initialize(this.pseudomatch).then(() => {
        this.generateGameFrames(replayData).then(() => {
          this.renderFrame(0);
          this.game.events.emit('setup');
        });
      });
    // }, 1000);
  }

  /**
   * Creates a snapshot of the game state
   * @param game
   */
  createFrame(game: Game, commands: any[]): Frame {
    const teamStates: FrameTeamStateData = {
      [Unit.TEAM.A]: {
        points: game.state.teamStates[Unit.TEAM.A].points,
        unitCount: game.getTeamsUnits(Unit.TEAM.A).size
      },
      [Unit.TEAM.B]: {
        points: game.state.teamStates[Unit.TEAM.B].points,
        unitCount: game.getTeamsUnits(Unit.TEAM.B).size
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
        lastRepaired: unit.lastRepairTurn,
        breakdownLevel: unit.getBreakdownLevel(game.state.turn, game.configs.parameters.BREAKDOWN_TURNS)
      });
    });

    return {
      unitData,
      teamStates,
      errors: this.currentTurnErrors,
      commands,
    };
  }

  public turn = 0;

  public handleTileClicked: HandleTileClicked;

  public currentSelectedTilePos: Position = null;

  create(configs: GameCreationConfigs) {
    console.log(configs);
    this.loadReplayData(configs.replayData);
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
    this.replayData.bases.forEach((b) => {
      let n = TILE_MAPPING.BASE0;
      if (b.team === Unit.TEAM.B) {
        n = TILE_MAPPING.BASE1;
      }
      this.dynamicLayer.putTileAt(n, b.x, b.y, true);
    });
  }


  async generateGameFrames(replayData) {
    while (this.currentTurn <= this.kothgame.configs.parameters.MAX_TURNS) {
      this.currentTurnErrors = [];
      const commands: any[] = replayData.allCommands[this.currentTurn];
      const state: State = this.pseudomatch.state;
      const game = state.game;
      await EnergiumLogic.update(this.pseudomatch, commands);

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

      const frame = this.createFrame(this.pseudomatch.state.game, commands);
      // console.log(
      //   { turn: this.currentTurn },
      //   'frame size',
      //   memorySizeOf(frame)
      // );
      this.frames.push(frame);
      this.currentTurn++;
    }
    console.log(this.frames);
  }
  update(time: number, delta: number) {}
}

export default MainScene;
