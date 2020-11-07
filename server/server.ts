import {create} from 'dimensions-ai/lib/main';
import {Agent} from 'dimensions-ai/lib/main/Agent';
import { EnergiumDesign } from '@acmucsd/energium-2020';
import { GCloudStorage, Logger, MongoDB, Tournament } from 'dimensions-ai';
import { Scheduler } from 'dimensions-ai/lib/main/Tournament/Scheduler';

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
  stationConfigs: {
    disableUploads: true,
  }
});

/** Define the images to use for each agent */
const languageSpecificAgentOptions: Agent.LanguageSpecificOptions = {
  '.py': {
    image: 'docker.io/acmaiucsd/python',
  },
  '.js': {
    image: 'docker.io/acmaiucsd/js',
  },
  '.java': {
    image: 'docker.io/acmaiucsd/java',
  }
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
      maxConcurrentMatches: 1,
      matchMake: Scheduler.TrueskillVarianceWeighted({
        seed: 0,
        range: 3,
        matchCount: 10,
        agentsPerMatch: [2],
      })
    },
    defaultMatchConfigs: {
      storeErrorLogs: true,
      loggingLevel: Logger.LEVEL.NONE,
      debug: false,
      compressReplay: true,
      agentOptions: {
        runCommands: { '.py': ['python3'] },
      },
      languageSpecificAgentOptions,
    },
    name: 'ACM AI Fall 2020 Tournament',
    id: 'tourney',
  });
};
setup();
