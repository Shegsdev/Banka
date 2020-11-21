import os from 'os';
import debug from 'debug';

const log = debug('express:build');

const { exec } = require('child_process');

const puts = (err, stdout, stderr) => {
  if (err) {
    return `error: ${err.message}`;
  }
  if (stderr) {
    return `stderror: ${stderr}`;
  }
  return stdout;
};

// Execute script depending on OS
if (os.type() === 'Linux' || os.type() === 'Darwin') {
  log('Server started...');
  exec('DEBUG=express:server node_modules/.bin/nodemon server/server.js --exec babel-node --', puts);
} else if (os.type() === 'Windows_NT') {
  log('Server started...');
  exec('set DEBUG=express:server & nodemon server/server.js --exec babel-node --', puts);
} else throw new Error(`Unsupported OS ${os.type()}`);
