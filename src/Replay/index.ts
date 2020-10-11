import { Match, MatchEngine } from 'dimensions-ai';
import fs from 'fs';
import path from 'path';
import { GameMap } from '../GameMap';
import { Unit } from '../Unit';

export class Replay {
  public replayFilePath: string = null;
  public data: {
    map: Array<
      Array<{
        ppt: number;
      }>
    >;
    bases: Array<{ x: number; y: number; team: Unit.TEAM }>;
    allCommands: Array<Array<MatchEngine.Command>>;
  } = {
    map: [],
    bases: [],
    allCommands: [],
  };
  constructor(match: Match) {
    const d = new Date().valueOf();
    const replayFileName = `${d}_${match.id}.replay`;
    this.replayFilePath = path.join(
      match.configs.storeReplayDirectory,
      replayFileName
    );
    if (!fs.existsSync(match.configs.storeReplayDirectory)) {
      fs.mkdirSync(match.configs.storeReplayDirectory, { recursive: true });
    }
    fs.writeFileSync(this.replayFilePath, '');
  }
  public writeMap(gameMap: GameMap): void {
    for (let y = 0; y < gameMap.width; y++) {
      this.data.map.push(
        gameMap.getRow(y).map((tile) => {
          return {
            ppt: tile.pointsPerTurn,
          };
        })
      );
    }
    gameMap.bases.forEach((base) => {
      this.data.bases.push({
        x: base.pos.x,
        y: base.pos.y,
        team: base.team,
      });
    });
  }
  public writeOut(): void {
    fs.appendFileSync(this.replayFilePath, JSON.stringify(this.data));
  }
}
