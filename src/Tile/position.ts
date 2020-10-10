import { Game } from '../Game';

export class Position {
  constructor(public x: number, public y: number) {}
  isAdjacent(pos: Position): boolean {
    const dx = this.x - pos.x;
    const dy = this.y - pos.y;
    if (Math.abs(dx) + Math.abs(dy) > 1) {
      return false;
    }
    return true;
  }
  translate(direction: Game.DIRECTIONS, units: number): Position {
    switch (direction) {
      case Game.DIRECTIONS.NORTH:
        return new Position(this.x, this.y - units);
      case Game.DIRECTIONS.EAST:
        return new Position(this.x + units, this.y);
      case Game.DIRECTIONS.SOUTH:
        return new Position(this.x, this.y + units);
      case Game.DIRECTIONS.WEST:
        return new Position(this.x - units, this.y);
    }
  }
  hash(): number {
    return this.x * 10e4 + this.y;
  }
  static parse(h: number): Position {
    return new Position(h % 10e4, Math.floor(h / 10e4));
  }
  toString() {
    return `(${this.x}, ${this.y})`;
  }
}
