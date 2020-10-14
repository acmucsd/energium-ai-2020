package energium;

import java.util.ArrayList;
import java.util.Scanner;

public class Agent {
    private final Scanner scanner;
    /** Id of your player / bot / agent */
    public int id;
    /** Current game turn */
    public int turn;
    public int mapWidth;
    public int mapHeight;

    public GameMap map;

    public ArrayList<Player> players;

    /**
     * Constructor for a new agent User should edit this according to their `Design`
     */
    public Agent() {
        scanner = new Scanner(System.in);
    }

    /**
     * Initialize Agent for the `Match` User should edit this according to their
     * `Design`
     */
    public void initialize() {
        // get agent ID
        id = scanner.nextInt();
        scanner.nextLine();
        turn = 0;
        String[] mapInfo = scanner.nextLine().split(" ");
        int width = Integer.parseInt(mapInfo[0]);
        int height = Integer.parseInt(mapInfo[1]);
        mapWidth = width;
        mapHeight = height;
        this.map = new GameMap(width, height);
        this.players = new ArrayList<>();
        this.players.add(new Player(0));
        this.players.add(new Player(1));
        this.retrieveUpdates();
    }

    private void retrieveUpdates() {
        this.players.get(0).units.clear();
        this.players.get(1).units.clear();
        while (true) {
            String update = scanner.nextLine();
            // console.error(update);

            if (update.equals(IOConstants.DONE)) {
                break;
            }
            String[] meta = update.split(" ");
            String inputIdentifier = meta[0];

            switch (inputIdentifier) {
                case IOConstants.BASE_LOCATION: {
                    int team = Integer.parseInt(meta[1]);
                    int x = Integer.parseInt(meta[2]);
                    int y = Integer.parseInt(meta[3]);
                    this.players.get(team).bases.add(new Base(team, x, y));
                    break;
                }
                case IOConstants.TILE_POINTS: {
                    int x = Integer.parseInt(meta[1]);
                    int y = Integer.parseInt(meta[2]);
                    int pts = Integer.parseInt(meta[3]);
                    Tile tile = this.map.getTile(x, y);
                    tile.energium = pts;
                    break;
                }
                case IOConstants.TEAM_POINTS: {
                    int team = Integer.parseInt(meta[1]);
                    int pts = Integer.parseInt(meta[2]);
                    this.players.get(team).energium = pts;
                    break;
                }
                case IOConstants.UNIT_DATA: {
                    int team = Integer.parseInt(meta[1]);
                    int unitid = Integer.parseInt(meta[2]);
                    int x = Integer.parseInt(meta[3]);
                    int y = Integer.parseInt(meta[4]);
                    int lastRepairTurn = Integer.parseInt(meta[5]);
                    this.players.get(team).units.add(new Unit(team, unitid, x, y, lastRepairTurn, this.turn));
                    break;
                }
            }
        }
    }

    /**
     * Updates agent's own known state of `Match` User should edit this according to
     * their `Design`.
     */
    public void update() {
        this.turn++;
        this.retrieveUpdates();
    }

    /**
     * End a turn
     */
    public void endTurn() {
        System.out.println("D_FINISH");
        System.out.flush();
    }
}