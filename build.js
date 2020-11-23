import os from 'os';
import { executer, output } from './server/utils/helpers';

// OS specific prefix
const win = 'set DEBUG=express:';
const unix = 'DEBUG=express:';

// Execute script depending on OS
let prefix;
if (os.type() === 'Windows_NT') prefix = win;
else if (os.type() === 'Linux' || os.type() === 'Darwin') prefix = unix;
else throw new Error(`Unsupported OS ${os.type()}`);

const cmd = executer(prefix, 'server', 'nodemon', 'server/server.js', '--exec', 'babel-node', '--');
output(cmd);
