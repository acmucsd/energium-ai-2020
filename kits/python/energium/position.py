from .game_constants import DIRECTIONS, GAME_CONSTANTS
import math
class Position:
    def __init__(self, x, y):
        self.x = x
        self.y = y

    def equals(self, opos):
        return self.x == opos.x and self.y == opos.y

    def is_adjacent(self, pos):
        """
        returns true if this position is adjacent to pos
        """
        dx = self.x - pos.x
        dy = self.y - pos.y
        if (math.abs(dx) + math.abs(dy) > 1):
            return False
        return True
    def translate(self, direction, units):
        """
        translate a position in a direction by some units and returns a translated
        Position
        """
        if direction == DIRECTIONS.NORTH:
            return Position(self.x, self.y - units)
        elif direction == DIRECTIONS.EAST:
            return Position(self.x + units, self.y)
        elif direction == DIRECTIONS.SOUTH:
            return Position(self.x, self.y + units)
        elif direction == DIRECTIONS.WEST:
            return Position(self.x - units, self.y)

    def distance_to(self, pos):
        """
        returns euclidean distance to the pos from this position
        """
        dx = pos.x - self.x
        dy = pos.y - self.y
        return math.sqrt(dx * dx + dy * dy)

    def direction_to(self, targetPos):
        """
        gives direction that moves closest to targetPos from this position or None if staying put is closer
        """
        checkDirections = [
            DIRECTIONS.NORTH,
            DIRECTIONS.EAST,
            DIRECTIONS.SOUTH,
            DIRECTIONS.WEST,
        ]
        closestDirection = None
        closestDist = self.distance_to(targetPos)
        for dir in checkDirections:
            newpos = self.translate(dir, 1)
            dist = targetPos.distance_to(newpos)
            if (dist < closestDist):
                closestDist = dist
                closestDirection = dir
        return closestDirection