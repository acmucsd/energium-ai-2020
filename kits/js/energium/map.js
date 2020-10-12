const GAME_CONSTANTS = require('./game_constants');
const DIRECTIONS = GAME_CONSTANTS.DIRECTIONS;
class GameMap {
  constructor(width, height) {
    this.height = height;
    this.width = width;
    this.map = new Array(this.height);
    for (let y = 0; y < this.height; y++) {
      this.map[y] = new Array(this.width);
      for (let x = 0; x < this.width; x++) {
        this.map[y][x] = new Tile(x, y);
      }
    }
  }
  getTileByPos(pos) {
    return this.map[pos.y][pos.x];
  }
  getTile(x, y) {
    return this.map[y][x];
  }
}

class Tile {
  constructor(x, y) {
    this.pos = new Position(x, y);
    this.energium = 0;
    this.baseTeam = null;
  }
  isBase() {
    return this.baseTeam !== null;
  }
}

class Position {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  isAdjacent(pos) {
    const dx = this.x - pos.x;
    const dy = this.y - pos.y;
    if (Math.abs(dx) + Math.abs(dy) > 1) {
      return false;
    }
    return true;
  }
  equals(pos) {
    return this.x === pos.x && this.y === pos.y;
  }

  translate(direction, units) {
    switch (direction) {
      case DIRECTIONS.NORTH:
        return new Position(this.x, this.y - units);
      case DIRECTIONS.EAST:
        return new Position(this.x + units, this.y);
      case DIRECTIONS.SOUTH:
        return new Position(this.x, this.y + units);
      case DIRECTIONS.WEST:
        return new Position(this.x - units, this.y);
    }
  }

  /** Returns distance to pos from this position */
  distanceTo(pos) {
    const dx = pos.x - this.x;
    const dy = pos.y - this.y;
    return Math.sqrt(dx * dx + dy * dy);
  }

  /** Returns closest direction to targetPos, or null if staying put is best */
  directionTo(targetPos) {
    const checkDirections = [
      DIRECTIONS.NORTH,
      DIRECTIONS.EAST,
      DIRECTIONS.SOUTH,
      DIRECTIONS.WEST,
    ];
    let closestDirection = null;
    let closestDist = this.distanceTo(targetPos);
    checkDirections.forEach((dir) => {
      const newpos = this.translate(dir, 1);
      const dist = targetPos.distanceTo(newpos);
      if (dist < closestDist) {
        closestDist = dist;
        closestDirection = dir;
      }
    });
    return closestDirection;
  }
}

module.exports = {
  GameMap,
  Tile,
  Position,
}