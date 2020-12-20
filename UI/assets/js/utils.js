/* eslint-disable no-unused-vars */
/* eslint-disable no-restricted-globals */
/* eslint-disable no-undef */
const redirect = {
  // Redirect user back to previous page
  previous() {
    const prev = document.referrer;
    if (prev !== ghPagesUrlRedirect(location.origin)) location.assign(prev);
  },

  // Back to home if already logged in
  toHome() {
    const token = localStorage.getItem('token');
    if (token) location.assign(ghPagesUrlRedirect(location.origin));
  },

  // To home page
  home() {
    setTimeout(() => location.assign(ghPagesUrlRedirect(location.origin)), 3000);
  },

  // To login page
  toLogin() {
    location.assign(`${ghPagesUrlRedirect(location.origin)}/UI/pages/login.html`);
  },
};

function ghPagesUrlRedirect(origin) {
  const url = 'https://shegsdev.github.io';
  if (url === origin) return `${url}/Banka`;
  return origin;
}


const env = {
  url() {
    const DEV_API_URL = 'http://localhost:5000/api/v2';
    const PROD_API_URL = 'http://surebanka.herokuapp.com/api/v2';
    if (location.origin.match('localhost')) return DEV_API_URL;
    return PROD_API_URL;
  }
}