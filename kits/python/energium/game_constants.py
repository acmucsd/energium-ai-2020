import json
import os 
dir_path = os.path.dirname(os.path.realpath(__file__))
GAME_CONSTANTS = json.loads('{}')
with open(dir_path + "/game_constants.json") as f:
    GAME_CONSTANTS = json.load(f)

class DIRECTIONS():
    NORTH = 'n'
    EAST = 'e'
    WEST ='w'
    SOUTH ='s'