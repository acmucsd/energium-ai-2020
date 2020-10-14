package energium;

public class Tile {
    /** Position of this tile */
    public Position pos;
    /** Energium value on this tile */
    public int energium;
    /**
     * If this is -1, this is not a base. Otherwise, this Tile is a tile with base
     * on it and baseTeam equals the team that owns the base
     */
    public int baseTeam;

    public Tile(int x, int y) {
        this.pos = new Position(x, y);
        this.energium = 0;
        this.baseTeam = -1;
    }

    /** Returns true if this tile is a base */
    public boolean isBase() {
        return this.baseTeam != -1;
    }
}
