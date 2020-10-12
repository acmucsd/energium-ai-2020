import { Position } from '../Tile/position';

export class Unit {
  
  // last turn this collector unit was repaired;
  public lastRepairTurn = 0;
  constructor(
    public team: Unit.TEAM,
    public id: number,
    public pos: Position
  ) {}
  /** How broken down the unit is. past max, the unit should vanish */
  getBreakdownLevel(turn: number, breakdownRate: number): number {
    return Math.floor(turn - this.lastRepairTurn) / breakdownRate;
  }
}
export namespace Unit {
  export enum TEAM {
    A = 0,
    B = 1,
  }
  export type ID = number;
  export const ALL_TEAMS = [Unit.TEAM.A, Unit.TEAM.B];
}
