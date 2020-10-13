from .game_constants import DIRECTIONS, GAME_CONSTANTS
import math
class Position:
    def __init__(self, x, y):
        self.x = x
        self.y = y

    def equals(self, opos):
        return self.x == opos.x and self.y == opos.y

    def isAdjacent(self, pos):
        dx = self.x - pos.x;
        dy = self.y - pos.y;
        if (math.abs(dx) + math.abs(dy) > 1):
            return False
        return True
    def translate(self, direction, units):
        if direction == DIRECTIONS.NORTH:
            return Position(self.x, self.y - units)
        elif direction == DIRECTIONS.EAST:
            return Position(self.x + units, self.y)
        elif direction == DIRECTIONS.SOUTH:
            return Position(self.x, self.y + units)
        elif direction == DIRECTIONS.WEST:
            return Position(self.x - units, self.y)

    def distanceTo(self, pos):
        dx = pos.x - self.x
        dy = pos.y - self.y
        return math.sqrt(dx * dx + dy * dy);

    def directionTo(self, targetPos):
        checkDirections = [
            DIRECTIONS.NORTH,
            DIRECTIONS.EAST,
            DIRECTIONS.SOUTH,
            DIRECTIONS.WEST,
        ];
        closestDirection = None
        closestDist = self.distanceTo(targetPos)
        for dir in checkDirections:
            newpos = self.translate(dir, 1)
            dist = targetPos.distanceTo(newpos)
            if (dist < closestDist):
                closestDist = dist
                closestDirection = dir
        return closestDirection