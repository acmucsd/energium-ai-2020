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
    storeErrorLogs: true,
    storeReplay: true,
    debug: false,
    debugDelay: 50,
    engineOptions: {
      noStdErr: false,
      timeout: {
        max: 1000,
      }
    },
    loggingLevel: Logger.LEVEL.DETAIL,
  });
  let res = await match.run();
  console.log(res);
};
run();