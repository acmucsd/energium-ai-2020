// run with node -r esm -r ts-node/register tests/match.ts
import { create, Logger } from 'dimensions-ai';
// test running a match
import { KingOfTheHillDesign } from '../src';
const design = new KingOfTheHillDesign('Koth Design');
const kdim = create(design, {
  name: 'kothdimension',
  id: 'kothdim',
  defaultMatchConfigs: {},
  loggingLevel: Logger.LEVEL.INFO,
  secureMode: false,
  observe: false,
  activateStation: false,
});

const js = './kits/js/bot.js';

const botList = [
  { file: js, name: 'js' },
  { file: js, name: 'js2' },
];

const run = async () => {
  const match = await kdim.createMatch(botList, {
    storeErrorLogs: false,
    storeReplay: true,
    seed: 1,
    debug: true,
    debugDelay: 50,
    engineOptions: {
      noStdErr: false,
    },
    loggingLevel: Logger.LEVEL.ALL,
  });
};
run();