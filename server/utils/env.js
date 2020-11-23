/* eslint-disable no-console */
import os from 'os';
import { executer, output } from './helpers';

// OS specific prefix
const win = 'set DEBUG=express';
const unix = 'DEBUG=express';

const scripts = {
  migration: ['create', 'drop', 'seed'],
};

// Get script from command line
const arg = process.argv[2];
const scriptsArray = Object.keys(scripts);
let script;
scriptsArray.forEach((s) => {
  if (scripts[s].includes(arg)) script = s;
});

if (script === 'migration') {
  let cmd;
  let prefix;
  if (os.type() === 'Windows_NT') prefix = win;
  else if (os.type() === 'Linux' || os.type() === 'Darwin') prefix = unix;
  else throw new Error(`Unsupported OS ${os.type()}`);

  switch (arg) {
    case 'create':
      cmd = executer(prefix, script, 'babel-node', 'server/utils/createTables');
      output(cmd);
      break;
    case 'drop':
      cmd = executer(prefix, script, 'babel-node', 'server/utils/dropTables');
      output(cmd);
      break;
    case 'seed':
      cmd = executer(prefix, script, 'babel-node', 'server/database/seeders');
      output(cmd);
      break;
    default:
      output('Expected argument from script.');
      output(`Try ${script} 'arg' or see readme for instruction`);
  }
}
