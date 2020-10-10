import { Tile } from "../Tile";
import { Position } from "../Tile/position";
import { Unit } from "../Unit";

export class GameMap {
  public map: Tile[][];
  public width = 0;
  public height = 0;
  public bases: Array<{pos: Position, team: Unit.TEAM}> = [];
  constructor(width: number, height: number) {
    this.height = this.width;
    this.width = this.height;
    for (let y = 0; y < height; y++) {
      this.map[y] = new Array(this.width);
      for (let x = 0; x < this.width; x++) {
        this.map[y][x] = new Tile(new Position(x, y));
      }
    }
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
}