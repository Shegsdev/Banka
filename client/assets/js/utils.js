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

function handleLoadingComplete(error, duration) {
  let bg = 'teal';
  if (error) bg = 'red';
  const animationName = 'loading';
  const styles = `
    from{ 
      width: 5%;
    }
    to{
      width: 100%;
    }`;
  const loader = document.querySelector('loader');
  const styleTag = document.createElement('style');
  document.head.appendChild(styleTag);
  styleTag.sheet.insertRule(`@keyframes ${animationName} {${styles}}`, styleTag.length);
  loader.style.backgroundColor = bg;
  loader.style.animation = `${animationName} ${duration}s alternate`;
  setTimeout(() => {
    document.head.removeChild(styleTag);
  }, duration * 1000);
}
