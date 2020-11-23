/* eslint-disable no-console */
import os from 'os';
import bcrypt from 'bcrypt';
import { config } from 'dotenv';

const { spawn } = require('child_process');

export const uniqueID = (array) => {
  if (array.length > 0) {
    return array[array.length - 1].id + 1;
  }
  return 1;
};

export const setAuthToken = (req, token) => {
  if (token) {
    req.headers['x-access-token'] = token;
  } else {
    req.headers['x-access-token'] = '';
  }
};

export function hash(password) {
  return new Promise((resolve, reject) => {
    bcrypt.genSalt(10, (_err, salt) => {
      bcrypt.hash(password, salt, (err, hashed) => {
        if (err) reject(err);
        resolve(hashed);
      });
    });
  });
}

// Command line display
export const output = (stream) => {
  if (stream == null) return;
  if (typeof stream === 'string') console.log(stream);
  else {
    stream.on('close', code => console.log(`child process exited with code ${code}`));
  }
};

export const getAppUrl = () => {
  config();
  return new URL(process.env.APP_URL);
};

export const executer = (prefix, script, ...args) => {
  const options = { shell: true, stdio: 'inherit' };
  if (os.type() === 'Windows_NT') args.unshift('&');
  return spawn(`${prefix}:${script}`, args, options);
};
