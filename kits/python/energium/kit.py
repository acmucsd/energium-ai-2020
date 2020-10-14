
from .game_objects import Base, Player, Unit
from .map import GameMap

def read_input():
    """
    Reads input from stdin
    """
    try:
        return input()
    except EOFError as eof:
        raise SystemExit(eof)
      
class Agent:
    """
    Constructor for a new agent
    User should edit this according to their `Design`
    """
    def __init__(self):
        pass

    """
    Initialize Agent for the `Match`
    User should edit this according to their `Design`
    """
    def initialize(self):
        self.id = int(read_input())
        self.turn: int = 0
        mapInfo = read_input().split(" ")
        width = int(mapInfo[0])
        height = int(mapInfo[1])
        self.mapWidth = width;
        self.mapHeight = height;
        self.map = GameMap(width, height);
        self.players: list[Player] = [Player(0), Player(1)];
        self.retrieve_updates()

    def resetPlayerStates(self):
        self.players[0].units = [];
        self.players[1].units = [];

    def retrieve_updates(self):
        self.resetPlayerStates()
        while(True):
            str = read_input()
            if str == "D_DONE":
                break
            update = str.split(" ")
            input_id = update[0]
            if input_id == 'b':
                team = int(update[1])
                x = int(update[2])
                y = int(update[3])
                self.players[team].bases.append(Base(team, x, y));
            elif input_id == 't':
                x = int(update[1])
                y = int(update[2])
                pts = int(update[3])
                tile = self.map.get_tile(x, y);
                tile.energium = pts;
            elif input_id == 'p':
                team = int(update[1])
                pts = int(update[2])
                self.players[team].energium = pts
            elif input_id == 'u':
                team = int(update[1])
                unitid = int(update[2])
                x = int(update[3])
                y = int(update[4])
                lrt = int(update[5])
                self.players[team].units.append(Unit(team, unitid, x, y, lrt, self.turn));



    """
    Updates Agent's own known state of `Match`
    User should edit this according to their `Design
    """
    def update(self):
        self.turn += 1
        self.retrieve_updates()

    """
    End a turn
    """
    def end_turn(self):
        print('D_FINISH')
        
