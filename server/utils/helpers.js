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
