from typing import List
from .position import Position
from .game_constants import GAME_CONSTANTS
import math
import sys
class Base:
    def __init__(self, team: int, x, y):
        self.team = team
        self.pos = Position(x, y)

    def spawn_unit(self):
        return 'c {} {}'.format(self.pos.x, self.pos.y)


class Unit:
    def __init__(self, team: int, unitid: int, x, y, last_repair_turn, turn):
        self.team = team
        self.id = unitid
        self.pos = Position(x, y)
        self.last_repair_turn = last_repair_turn
        self.match_turn = turn
    
    def get_breakdown_level(self):
        """
        returns the breakdown level of this unit
        """
        return (self.match_turn - self.last_repair_turn) / GAME_CONSTANTS['PARAMETERS']['BREAKDOWN_TURNS'];
    def move(self, dir):
        self.pos = self.pos.translate(dir, 1)
        return 'm {} {}'.format(self.id, dir)

class Player:
    energium: int
    team: int
    units: List[Unit]
    bases: List[Base]
    def __init__(self, team):
        self.team = team
        self.bases = []
        self.units = []
        self.energium = 0
