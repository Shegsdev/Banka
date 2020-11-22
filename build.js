import os from 'os';
import { output } from './server/utils/helpers';

const { spawn } = require('child_process');

// OS specific prefix
const win = 'set DEBUG=express:server';
const unix = 'DEBUG=express:server';

// Execute script depending on OS
if (os.type() === 'Linux' || os.type() === 'Darwin') {
  const cmd = spawn(unix, ['node_modules/.bin/nodemon server/server.js --exec babel-node --'], { shell: true });
  output(cmd);
} else if (os.type() === 'Windows_NT') {
  const cmd = spawn(win, ['& nodemon server/server.js --exec babel-node --'], { shell: true });
  output(cmd);
} else throw new Error(`Unsupported OS ${os.type()}`);
