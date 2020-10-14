package energium;

public class Base {
  /** what team this base is on */
  public int team;
  /** position of this base */
  public Position pos;

  public Base(int teamid, int x, int y) {
    this.team = teamid;
    this.pos = new Position(x, y);
  }

  /** return the command to move unit in the given direction */
  public String spawnUnit() {
    return "c " + this.pos.x + " " + this.pos.y;
  }
}
