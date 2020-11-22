/* eslint-disable no-console */
import os from 'os';
import { output } from './helpers';

const { spawn } = require('child_process');

// OS specific prefix
const win = 'set DEBUG=express';
const unix = 'DEBUG=express';

const executer = (script, ...args) => {
  args.unshift('&');
  if (os.type() === 'Windows_NT') return spawn(`${win}:${script}`, args, { shell: true });
  if (os.type() === 'Linux' || os.type === 'Darwin') return spawn(`${unix}:${script}`, args, { shell: true });
  throw new Error(`Unsupported OS ${os.type()}`);
};

// Get executed script
const { original } = JSON.parse(process.env.npm_config_argv);
const script = original[1];

// Get command line args
const arg = process.argv[2];

if (script === 'migration') {
  let cmd;
  switch (arg) {
    case 'create':
      cmd = executer(script, 'babel-node', 'createTables');
      output(cmd);
      break;
    case 'drop':
      cmd = executer(script, 'babel-node', 'dropTables');
      output(cmd);
      break;
    case 'seed':
      cmd = executer(script, 'babel-node', 'server/database/seeders');
      output(cmd);
      break;
    default:
      output('Expected argument from script.');
      output(`Try ${script} 'arg' or see readme for instruction`);
  }
}
