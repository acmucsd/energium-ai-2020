package energium;

public enum Direction {
    NORTH("n"), EAST("e"), SOUTH("s"), WEST("w");

    public String str;

    Direction(final String s) {
        this.str = s;
    }

    @Override
    public String toString() {
        return this.str;
    }
}
