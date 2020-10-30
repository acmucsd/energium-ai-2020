from .game_constants import DIRECTIONS, GAME_CONSTANTS
import math
class Position:
    def __init__(self, x, y):
        self.x = x
        self.y = y

    def __eq__(self, other):
        return self.x == other.x and self.y == other.y

    def equals(self, opos):
        return self.x == opos.x and self.y == opos.y

    def is_adjacent(self, pos):
        """
        returns true if this position is adjacent to pos
        """
        dx = self.x - pos.x
        dy = self.y - pos.y
        if (abs(dx) + abs(dy) > 1):
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

    def taxicab_distance_to(self, pos):
        """
        returns taxicab distance to the pos from this position
        """
        return abs(self.x - pos.x) + abs(self.y - pos.y)

    def direction_to_quick(self, target):
        """
        Same as direction_to but runs quicker.
        """
        closest_direction = None
        taxicab_dist = taxicab_distance(self, target)
        bigger_side_length = max(abs(self.x - target.x), abs(self.y - target.y))
        for dir in [DIRECTIONS.NORTH, DIRECTIONS.EAST,
                    DIRECTIONS.SOUTH, DIRECTIONS.WEST]:
            newpos = self.translate(dir, 1)
            dist = taxicab_distance(newpos, target)
            if dist < taxicab_dist:
                taxicab_dist = dist
                bigger_side_length = max(abs(newpos.x - target.x), abs(newpos.y - target.y))
                closest_direction = dir
            elif dist == taxicab_dist:
                s = max(abs(newpos.x - target.x), abs(newpos.y - target.y))
                if s < bigger_side_length:
                    bigger_side_length = s
                    closest_direction = dir
        return closest_direction
