package energium;

public class Unit {
  /** What team unit is on */
  public int team;

  /** Unit's position */
  public Position pos;

  public int lastRepairTurn;
  public int id;

  private int matchTurn;

  public Unit(int teamid, int unitid, int x, int y, int lastRepairTurn, int turn) {
    this.pos = new Position(x, y);
    this.team = teamid;
    this.id = unitid;
    this.lastRepairTurn = lastRepairTurn;
    this.matchTurn = turn;
  }

  /** return the command to move unit in the given direction */
  public String move(Direction dir) {
    return "m " + this.id + " " + dir;
  }

  /** returns the breakdown level of this unit */
  public int getBreakdownLevel() {
    return (int) Math.floor((this.matchTurn - this.lastRepairTurn) / GameConstants.BREAKDOWN_TURNS);
  }
}
