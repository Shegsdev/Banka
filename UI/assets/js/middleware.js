/* eslint-disable no-unused-vars */
/* eslint-disable no-restricted-globals */
/* eslint-disable no-undef */
/* eslint-disable func-names */

function ghPagesUrlRedirect(origin) {
  const url = 'https://shegsdev.github.io';
  if (url === origin) return `${url}/Banka`;
  return origin;
}

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
    setTimeout(() => location.assign(ghPagesUrlRedirect(location.origin)), 2500);
  },

  // To login page
  toLogin() {
    location.assign(`${ghPagesUrlRedirect(location.origin)}/UI/pages/login.html`);
  },
};

function withAuth() {
  const token = localStorage.getItem('token');
  if (!token) redirect.toLogin();
}

function logout() {
  localStorage.clear();
  showToast(true, 'Logout successful');
  return redirect.home();
}
