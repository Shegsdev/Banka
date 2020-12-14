/* eslint-disable no-unused-vars */
/* eslint-disable no-restricted-globals */
/* eslint-disable no-undef */
const redirect = {
  // Redirect user back to previous page
  previous() {
    const prev = document.referrer;
    if (prev !== location.origin) location.assign(prev);
  },

  // Back to home if already logged in
  toHome() {
    const token = localStorage.getItem('token');
    if (token) location.assign(location.origin);
  },

  // To home page
  home() {
    setTimeout(() => location.assign(location.origin), 3000);
  },

  // To login page
  toLogin() {
    location.assign(`${location.origin}/UI/pages/login.html`);
  },
};
