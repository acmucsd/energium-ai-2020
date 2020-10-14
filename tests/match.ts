// run with node -r esm -r ts-node/register tests/match.ts
import { create, Logger } from 'dimensions-ai';
// test running a match
import { EnergiumDesign } from '../src';
const design = new EnergiumDesign('Koth Design');
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
const py = './kits/python/bot.py';
const java = './kits/java/Bot.java';
const goodjs = './tests/bots/js1/bot.js';
const botList = [
  { file: java, name: 'java' },
  { file: goodjs, name: 'goodjs' },
];

const run = async () => {
  const match = await kdim.createMatch(botList, {
    storeErrorLogs: true,
    storeReplay: true,
    debug: false,
    debugDelay: 50,
    compressReplay: true,
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