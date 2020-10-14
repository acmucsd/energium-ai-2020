package energium;

public class Position {
  public int x;
  public int y;

  public Position(int x, int y) {
    this.x = x;
    this.y = y;
  }

  /** Returns true if this position is adjacent to another position */
  public boolean isAdjacent(Position pos) {
    int dx = this.x - pos.x;
    int dy = this.y - pos.y;
    if (Math.abs(dx) + Math.abs(dy) > 1) {
      return false;
    }
    return true;
  }

  public boolean equals(Position pos) {
    return this.x == pos.x && this.y == pos.y;
  }

  /**
   * Translate a position in a direction by some units and returns a translated
   * Position
   */
  public Position translate(Direction direction, int units) {
    switch (direction) {
      case NORTH:
        return new Position(this.x, this.y - units);
      case EAST:
        return new Position(this.x + units, this.y);
      case SOUTH:
        return new Position(this.x, this.y + units);
      case WEST:
        return new Position(this.x - units, this.y);
    }
    throw new Error("Did not supply valid direction");
  }

  /** Returns distance to pos from this position */
  public double distanceTo(Position pos) {
    int dx = pos.x - this.x;
    int dy = pos.y - this.y;
    return Math.sqrt(dx * dx + dy * dy);
  }

  /** Returns closest direction to targetPos, or null if staying put is best */
  public Direction directionTo(Position targetPos) {
    Direction[] checkDirections = { Direction.NORTH, Direction.EAST, Direction.SOUTH, Direction.WEST, };
    Direction closestDirection = null;
    double closestDist = this.distanceTo(targetPos);
    for (Direction dir : checkDirections) {
      Position newpos = this.translate(dir, 1);
      double dist = targetPos.distanceTo(newpos);
      if (dist < closestDist) {
        closestDist = dist;
        closestDirection = dir;
      }
    }
    return closestDirection;
  }

  @Override
  public String toString() {
    return "(" + this.x + ", " + this.y + ")";
  }
}
