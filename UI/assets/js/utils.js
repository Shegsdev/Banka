/* eslint-disable no-undef */
/* eslint-disable no-restricted-globals */
/* eslint-disable no-unused-vars */

const env = {
  url() {
    const DEV_API_URL = 'http://localhost:5000/api/v2';
    const PROD_API_URL = 'https://surebanka.herokuapp.com/api/v2';
    if (location.origin.match(/\b\.com\b/)) return PROD_API_URL;
    if (location.origin.match('localhost') || location.origin.match('127.0.0.1')) return DEV_API_URL;
    return PROD_API_URL;
  },
};

function errorResponse(error) {
  if (typeof error === 'string') return error;
  return Object.values(error)[0];
}
