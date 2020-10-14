package energium;

import java.util.ArrayList;

public class Player {
  /** Player's team */
  public int team;
  /** Total energium in store for this player */
  public int energium;
  /** List of owned collector units */
  public ArrayList<Unit> units;
  /** List of owned Bases */
  public ArrayList<Base> bases;

  public Player(int teamid) {
    this.team = teamid;
    this.energium = 0;
    this.units = new ArrayList<>();
    this.bases = new ArrayList<>();
  }
}
