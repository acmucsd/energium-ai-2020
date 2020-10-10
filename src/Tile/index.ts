import { Unit } from "../Unit";
import { Position } from "./position";

export class Tile {
  public pointsPerTurn = 0
  public pos: Position;
  public units: Map<Unit.ID, Unit> = new Map();
  public baseTeam: Unit.TEAM = null;
  constructor(position: Position, ppt: number = 0) {
    this.pos = position;
    this.pointsPerTurn = ppt;
  }
  setBaseTile(team: Unit.TEAM) {
    this.baseTeam = team;
  }
  isBaseTile(): boolean {
    return this.baseTeam !== null;
  }
}