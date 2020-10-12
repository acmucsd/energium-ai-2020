#!/usr/bin/env node
import { create, Logger } from 'dimensions-ai';
import { MatchDestroyedError } from 'dimensions-ai/lib/main/DimensionError';
import yargs from 'yargs';
// import { create, Logger, DError } from 'dimensions-ai';
yargs
  .options({
    seed: {
      alias: 's',
      describe: 'seed for match',
    },
    suppress: {
      describe: 'suppress all logs',
      default: 'false',
    },
    maxtime: {
      describe: 'max time per turn for the bot',
      default: 1000,
    },
    storelogs: {
      describe: 'whether to store error logs as files',
      default: 'true',
    },
    storereplay: {
      describe: 'whether to store replays or not',
      default: 'true',
    },
    compressreplay: {
      describe: 'whether to compress replays from JSON to binary format',
      default: 'false',
    },
  })
  .help();
let argv = yargs.argv;

// take in two files
let file1 = argv._[0];
let file2 = argv._[1];
let maxtime = 1000;
if (argv.maxtime) {
  maxtime = parseInt(<string>argv.maxtime);
  if (isNaN(maxtime)) {
    throw Error('maxtime argument is not a number');
  }
}
let loglevel = Logger.LEVEL.WARN;
if (argv.suppress === 'true') {
  loglevel = Logger.LEVEL.NONE;
}

let storelogs = true;
if (argv.storelogs === 'false') {
  storelogs = false;
}
let storereplays = true;
if (argv.storereplays === 'false') {
  storereplays = false;
}
let compressreplay = false;
if (argv.compressreplay === 'true') {
  compressreplay = true;
}

if (argv.log) {
  loglevel = parseInt(<string>argv.log);
  if (isNaN(loglevel)) {
    throw Error('log argument is not a number');
  }
}
let seed: any = Math.floor(Math.random() * 1000000);
if (argv.seed) {
  seed = argv.seed;
}

import { EnergiumDesign } from '.';
const design = new EnergiumDesign('Energium Design', {
  engineOptions: {
    noStdErr: false,
    timeout: {
      max: maxtime,
    },
  },
});
const edim = create(design, {
  loggingLevel: loglevel,
  activateStation: false,
  observe: false,
  defaultMatchConfigs: {
    agentOptions: {
      runCommands: { '.py': ['python3'] },
    },
    storeErrorLogs: storelogs,
    storereplays: storereplays,
  },
});

edim
  .runMatch(
    [
      { file: file1, name: file1 },
      { file: file2, name: file2 },
    ],
    {
      seed,
      compressReplay: compressreplay,
    }
  )
  .then((r) => console.log(r))
  .catch((err) => {
    if (err instanceof MatchDestroyedError) {
      // ignore;
    } else {
      throw err;
    }
  })
  .catch((err) => {
    console.error(err);
  });
