/**
 * All game objects for access by user
 */
const {
  Position
} = require("./map");
const GAME_CONSTANTS = require("./game_constants");

/**
 * holds all data related to a player
 */
class Player {
  constructor(teamid) {
    this.team = teamid;
    this.points = 0;
    /** array of all units */
    this.units = [];
    /** arrrary of all bases */
    this.bases = [];
  }
}

// all data related to a Base
class Base {
  constructor(teamid, x, y) {
    this.team = teamid;
    this.pos = new Position(x, y);
  }
  /** return the command to move unit in the given direction */
  spawnUnit() {
    return `c ${this.pos.x} ${this.pos.y}`;
  }
}

class Unit {
  constructor(teamid, unitid, x, y) {
    this.pos = new Position(x, y);
    this.team = teamid;
    this.id = unitid;
  }
 
  /** return the command to move unit in the given direction */
  move(dir) {
    return `m ${this.id} ${dir}`;
  }
}

module.exports = {
  Player,
  Base,
  Unit,
}