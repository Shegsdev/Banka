import bcrypt from 'bcrypt';

// Generate unique id
export const uniqueID = (array) => {
  if (array.length > 0) {
    return array[array.length - 1].id + 1;
  }
  return 1;
};

// Set token
export const setAuthToken = (req, token) => {
  if (token) {
    req.headers['x-access-token'] = token;
  } else {
    req.headers['x-access-token'] = '';
  }
};

// Hash password
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
