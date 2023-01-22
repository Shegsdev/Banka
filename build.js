import os from 'os';
import { executer, output } from './server/utils/helpers';

// OS specific prefix
const win = 'set DEBUG=express';
const unix = 'DEBUG=express';

const osType = {
	'Windows_NT': win,
	'Linux': unix,
	'Darwin': unix,
};

// Execute script depending on OS
const prefix = osType[os.type()];
if (prefix == undefined) throw new Error(`Unsupported OS: ${os.type()}`);

const cmd = executer(prefix, 'server', 'nodemon', 'server/server.js', '--exec', 'babel-node', '--');
output(cmd);
