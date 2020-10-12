import 'colors';
import { Tile } from '../Tile';
import { Position } from '../Tile/position';
import { Unit } from '../Unit';

export class GameMap {
  public map: Tile[][] = [];
  public width = 0;
  public height = 0;
  public bases: Array<{ pos: Position; team: Unit.TEAM }> = [];
  constructor(width: number, height: number) {
    this.height = height;
    this.width = width;
    for (let y = 0; y < this.height; y++) {
      this.map[y] = new Array(this.width);
      for (let x = 0; x < this.width; x++) {
        this.map[y][x] = new Tile(new Position(x, y));
      }
    }
  }
  setBase(team: Unit.TEAM, x: number, y: number): void {
    this.bases.push({
      pos: new Position(x, y),
      team,
    });
    this.getTile(x, y).baseTeam = team;
    this.getTile(x, y).pointsPerTurn = 0;
  }
  inMap(pos: Position): boolean {
    return !(
      pos.x < 0 ||
      pos.y < 0 ||
      pos.x >= this.width ||
      pos.y >= this.height
    );
  }

  getTileByPos(pos: Position): Tile {
    return this.map[pos.y][pos.x];
  }
  getTile(x: number, y: number): Tile {
    return this.map[y][x];
  }
  getRow(y: number): Array<Tile> {
    return this.map[y];
  }
  getAdjacentTiles(cell: Tile): Array<Tile> {
    const tiles: Array<Tile> = [];

    // NORTH
    if (cell.pos.y > 0) {
      tiles.push(this.getTile(cell.pos.x, cell.pos.y - 1));
    }
    // EAST
    if (cell.pos.x < this.width - 1) {
      tiles.push(this.getTile(cell.pos.x + 1, cell.pos.y));
    }
    // SOUTH
    if (cell.pos.y < this.height - 1) {
      tiles.push(this.getTile(cell.pos.x, cell.pos.y + 1));
    }
    // WEST
    if (cell.pos.x > 0) {
      tiles.push(this.getTile(cell.pos.x - 1, cell.pos.y));
    }
    return tiles;
  }

  /**
   * Return printable map string
   */
  getMapString(): string {
    let str = '';
    for (let y = 0; y < this.height; y++) {
      str +=
        this.getRow(y)
          .map((tile) => {
            if (tile.units.size > 0) {
              if (tile.units.size === 1) {
                let unitstr = '';
                tile.units.forEach((unit) => {
                  let identifier = unit.id + '';
                  if (unit.team === Unit.TEAM.A) {
                    unitstr = identifier.cyan;
                  } else {
                    unitstr = identifier.red;
                  }
                });
                return unitstr;
              }
            } else if (tile.isBaseTile()) {
              if (tile.baseTeam === Unit.TEAM.A) {
                return `▩`.cyan;
              } else {
                return `▩`.red;
              }
            } else {
              if (tile.pointsPerTurn > 0) {
                return `${tile.pointsPerTurn}`.green;
              } else if (tile.pointsPerTurn < 0) {
                return `${Math.abs(tile.pointsPerTurn)}`.red;
              } else {
                return '0'.gray;
              }
            }
          })
          .join(' ') + '\n';
    }
    return str;
  }
}
