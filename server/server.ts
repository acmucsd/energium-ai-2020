import {create} from 'dimensions-ai/lib/main';
import {Agent} from 'dimensions-ai/lib/main/Agent';
import { EnergiumDesign } from '@acmucsd/energium-2020';
import { GCloudStorage, Logger, MongoDB, Tournament } from 'dimensions-ai';

const design = new EnergiumDesign('kothdesign');
//@ts-ignore
const acmdim = create(design, {
  name: 'acmdimension',
  id: 'acmdim',
  defaultMatchConfigs: {},
  loggingLevel: Logger.LEVEL.INFO,
  secureMode: true,
  observe: true,
  activateStation: true,
});

/** Define the images to use for each agent */
const languageSpecificAgentOptions: Agent.LanguageSpecificOptions = {
  '.py': {
    image: 'docker.io/acmaiucsd/python',
  },
  '.js': {
    image: 'docker.io/acmaiucsd/js',
  },
};

const js = '../kits/js/bot.js';
const setup = async () => {
  const mongo = new MongoDB(process.env.MONGO_CONNECTION_STRING);
  const gcs = new GCloudStorage({
    projectId: 'acm-ai-proto-code',
    keyFilename: './keys/gcs-key.json',
  });
  await acmdim.use(mongo);
  await acmdim.use(gcs);
  acmdim.createTournament([], {
    rankSystem: Tournament.RankSystemTypes.TRUESKILL,
    type: Tournament.Type.LADDER,
    resultHandler: EnergiumDesign.resultHandler,
    agentsPerMatch: [2],
    consoleDisplay: false,
    tournamentConfigs: {
      syncConfigs: true,
    },
    defaultMatchConfigs: {
      storeErrorLogs: true,
      loggingLevel: Logger.LEVEL.NONE,
      debug: false,
      compressReplay: true,
      languageSpecificAgentOptions,
    },
    name: 'ACM AI Fall 2020 Tournament',
    id: 'tourney',
  });
};
setup();
