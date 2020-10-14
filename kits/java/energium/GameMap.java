package energium;

public class GameMap {
    public int height;
    public int width;
    public Tile[][] map;

    public GameMap(int width, int height) {
        this.height = height;
        this.width = width;
        this.map = new Tile[height][width];
        for (int y = 0; y < this.height; y++) {
            for (int x = 0; x < this.width; x++) {
                this.map[y][x] = new Tile(x, y);
            }
        }
    }

    public Tile getTileByPos(Position pos) {
        return this.map[pos.y][pos.x];
    }

    public Tile getTile(int x, int y) {
        return this.map[y][x];
    }
}
