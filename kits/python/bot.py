from energium.game_constants import GAME_CONSTANTS, DIRECTIONS
ALL_DIRECTIONS = [DIRECTIONS.EAST, DIRECTIONS.NORTH, DIRECTIONS.WEST, DIRECTIONS.SOUTH]
from energium.kit import Agent
import sys
import math
import random

# Create new agent
agent = Agent()

# initialize agent
agent.initialize()

# Once initialized, we enter an infinite loop
while True:

    # wait for update from match engine
    agent.update()

    commands = []

    player = agent.players[agent.id];
    opponent = agent.players[(agent.id + 1) % 2];

    my_units = player.units;
    my_bases = player.bases;
    print('Turn {} | ID: {} - {} bases - {} units - energium {}'.format(agent.turn, player.team, len(my_bases), len(my_units), player.energium), file=sys.stderr);
    # AI Code goes here #
    if len(my_units) < 4 and player.energium >= GAME_CONSTANTS["PARAMETERS"]["UNIT_COST"]:
        commands.append(my_bases[0].spawn_unit());
    
    for unit in my_units:
      randomDirection = ALL_DIRECTIONS[math.floor(random.random() * len(ALL_DIRECTIONS))]
      commands.append(unit.move(randomDirection))

    # submit commands to the `MatchEngine` and the `Match`, using ',' as the delimiter
    print(','.join(commands))

    # now we end our turn
    agent.end_turn()