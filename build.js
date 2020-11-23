import os from 'os';
import { executer, output } from './server/utils/helpers';

// OS specific prefix
const win = 'set DEBUG=express:';
const unix = 'DEBUG=express:';

// Get executed script
const { original } = JSON.parse(process.env.npm_config_argv);
const script = original[1];

// Execute script depending on OS
if (script === 'dev' || script === 'start') {
  let prefix;
  if (os.type() === 'Windows_NT') prefix = win;
  else if (os.type() === 'Linux' || os.type() === 'Darwin') prefix = unix;
  else throw new Error(`Unsupported OS ${os.type()}`);

  const cmd = executer(prefix, 'server', 'nodemon', 'server/server.js', '--exec', 'babel-node', '--');
  output(cmd);
}
