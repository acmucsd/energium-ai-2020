import { Position } from '../Tile/position';

export class Unit {
  constructor(
    public team: Unit.TEAM,
    public id: number,
    public pos: Position
  ) {}
}
export namespace Unit {
  export enum TEAM {
    A = 0,
    B = 1,
  }
  export type ID = number;
  export const ALL_TEAMS = [Unit.TEAM.A, Unit.TEAM.B];
}
