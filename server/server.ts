import * as Dimensions from 'dimensions-ai';
import { LuxDesign } from '@lux-ai/2020-challenge';
import { GCloudStorage, Logger, MongoDB, Tournament } from 'dimensions-ai';

const design = new LuxDesign('Lux Design');
const acmdim = Dimensions.create(design, {
  name: 'acmdimension',
  id: 'acmdim',
  defaultMatchConfigs: {},
  loggingLevel: Logger.LEVEL.INFO,
  secureMode: true,
  observe: true,
  activateStation: true,
});

/** Define the images to use for each agent */
const languageSpecificAgentOptions: Dimensions.Agent.LanguageSpecificOptions = {
  '.py': {
    image: 'docker.io/python',
  },
  '.js': {
    image: 'node:12.18.4-alpine3.9',
  },
};

const setup = async () => {
  const mongo = new MongoDB(process.env.MONGO_CONNECTION_STRING);
  const gcs = new GCloudStorage({
    projectId: 'lux-ai-test',
    keyFilename: './keys/gcs-key.json',
  });
  await acmdim.use(mongo);
  await acmdim.use(gcs);
  acmdim.createTournament([], {
    rankSystem: Tournament.RankSystemTypes.TRUESKILL,
    type: Tournament.Type.LADDER,
    resultHandler: LuxDesign.resultHandler,
    agentsPerMatch: [2],
    consoleDisplay: false,
    tournamentConfigs: {
      syncConfigs: true,
    },
    defaultMatchConfigs: {
      storeErrorLogs: true,
      loggingLevel: Logger.LEVEL.NONE,
      debug: false,
      mapType: 'debug',
      languageSpecificAgentOptions,
    },
    name: 'ACM AI Fall 2020 Tournament',
    id: 'acmtourney-fall2020',
  });
};
setup();
