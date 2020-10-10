import { Game } from '../Game';
import { Tile } from '../Tile';
import { Position } from '../Tile/position';
import { Unit } from '../Unit';

/**
 * Internal representations of agent sent actions. All actions must be validated prior to construction
 */
export abstract class Action {
  constructor(public action: Game.ACTIONS, public team: Unit.TEAM) {}
}

export class MoveAction extends Action {
  constructor(
    action: Game.ACTIONS,
    team: Unit.TEAM,
    public unitid: Unit.ID,
    public direction: Game.DIRECTIONS,
  ) {
    super(action, team);
  }
}

export class SpawnAction extends Action {
  public pos: Position;
  constructor(
    action: Game.ACTIONS,
    team: Unit.TEAM,
    x: number,
    y: number
  ) {
    super(action, team);
    this.pos = new Position(x, y);
  }
}