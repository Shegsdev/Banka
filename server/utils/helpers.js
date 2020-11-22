/* eslint-disable no-console */
import bcrypt from 'bcrypt';

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
    stream.stdout.on('data', (data) => { console.log(`stdout: ${data}`); });
    stream.stderr.on('data', (data) => { console.log(`stderr: ${data}`); });
    stream.on('error', (error) => { console.log(`error: ${error}`); });
    stream.on('close', code => console.log(`child process exited with code ${code}`));
  }
};
