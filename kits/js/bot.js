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

    const myUnits = player.units;
    const myBases = player.bases;
    console.error(`Turn ${agent.turn} | ID: ${player.team} - ${player.bases.length} bases - ${myUnits.length} units - energium ${player.energium}`);

    /** AI Code goes here */
    let commands = [];

    // spawn unit until we have 4 units
    if (myUnits.length < 4 && player.energium >= GAME_CONSTANTS.PARAMETERS.UNIT_COST) {
      commands.push(myBases[0].spawnUnit());
    }

    for (let i = 0; i < myUnits.length; i++) {
      const unit = myUnits[i];
      // move randomly
      randomDirection = ALL_DIRECTIONS[Math.floor(Math.random() * ALL_DIRECTIONS.length)];
      commands.push(unit.move(randomDirection));
    }


    // make our units move south
    
    /** AI Code ends here */

    // submit commands to the engine
    console.log(commands.join(','));

    // now we end our turn
    agent.endTurn();

  }
});