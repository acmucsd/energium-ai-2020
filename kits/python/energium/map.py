from typing import List
from .position import Position
from .game_objects import Player, Base

class GameMap:
    def __init__(self, width, height):
        self.width = width
        self.height = height
        self.bases: List[Base] = []
        self.players: List[Player] = []

        self.map = []
        for y in range(self.height):
            self.map.append([])
            for x in range(self.width):
                self.map[y].append(Tile(x, y))

    def get_tile_by_pos(self, pos: Position):
        return self.map[pos.y][pos.x]
    def get_tile(self, x: int, y: int):
        return self.map[y][x]

class Tile:
    base_team: int
    energium: int
    pos: Position
    def __init__(self, x, y):
        self.pos = Position(x, y)
        self.base_team = None
        self.energium = 0
    def is_base(self):
        return self.baseTeam != None
