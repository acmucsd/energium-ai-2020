const kit = require('./energium/kit');
const GAME_CONSTANTS = require('./energium/game_constants');
const DIRECTIONS = GAME_CONSTANTS.DIRECTIONS;
const ALL_DIRECTIONS = [DIRECTIONS.EAST, DIRECTIONS.NORTH, DIRECTIONS.WEST, DIRECTIONS.SOUTH];
// create a new agent
const agent = new kit.Agent();

// first initialize the agent, and then proceed to go in a loop waiting for updates and running the AI
agent.initialize().then(async () => {
  while (true) {
    // wait for update from match engine
    await agent.update();

    // player is your player, opponent is the opposing player
    const player = agent.players[agent.id];
    const opponent = agent.players[(agent.id + 1) % 2];

    /** All of your collector units */
    const myUnits = player.units;
    /** All of your bases */
    const myBases = player.bases;

    // Use console.error to print messages to the terminal or your error log.
    // console.log is reserved for the match engine. Uncomment the lines below to log something
    // console.error(`Turn ${agent.turn} | ID: ${player.team} - ${player.bases.length} bases - ${myUnits.length} units - energium ${player.energium}`);

    /** AI Code goes here */
    /**
     * Let your creativity go wild. Feel free to change this however you want and
     * submit it as many times as you want to the servers
     */
    let commands = [];

    // spawn unit until we have 4 units
    if (myUnits.length < 4 && player.energium >= GAME_CONSTANTS.PARAMETERS.UNIT_COST) {
      commands.push(myBases[0].spawnUnit());
    }

    // iterate over all of our collectors and make them do something
    for (let i = 0; i < myUnits.length; i++) {
      const unit = myUnits[i];
      // first we check the breakdown level, if unit is about to break down, lets make
      // it move towards a random friendly base
      if (unit.getBreakdownLevel() >= GAME_CONSTANTS.PARAMETERS.BREAKDOWN_MAX - 2) {
        const directionBackToBase = unit.pos.directionTo(myBases[0].pos);
        commands.push(unit.move(directionBackToBase));
      } else {
        // otherwise lets try to collect our energium
        // choose a random direction to move in
        // food for thought - is this optimal to do?
        randomDirection = ALL_DIRECTIONS[Math.floor(Math.random() * ALL_DIRECTIONS.length)];

        // move in that direction if the tile the unit would move towards is not
        // negative in energium and is on the map
        newPos = unit.pos.translate(randomDirection, 1);
        if (newPos.x >= 0 && newPos.x < agent.mapWidth && newPos.y >= 0 && newPos.y < agent.mapHeight) {
          if (agent.map.getTileByPos(newPos).energium < 0) {
            // stay put instead of randomly going to a bad tile
          } else {
            commands.push(unit.move(randomDirection));
          }
        }
      }
    }
    
    /** AI Code ends here */

    // submit commands to the engine
    console.log(commands.join(','));

    // now we end our turn
    agent.endTurn();

  }
});