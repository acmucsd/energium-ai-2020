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
  constructor(teamid, unitid, x, y, lastRepairTurn, turn) {
    this.pos = new Position(x, y);
    this.team = teamid;
    this.id = unitid;
    this.lastRepairTurn = lastRepairTurn;
    this.matchTurn = turn;
  }
 
  /** return the command to move unit in the given direction */
  move(dir) {
    return `m ${this.id} ${dir}`;
  }

  getBreakdownLevel() {
    return Math.floor((this.matchTurn - this.lastRepairTurn) / GAME_CONSTANTS.PARAMETERS.BREAKDOWN_TURNS);
  }
}

module.exports = {
  Player,
  Base,
  Unit,
}