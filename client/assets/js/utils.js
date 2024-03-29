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

function handleLoadingComplete(error, duration, color='') {
  let bg = 'teal';
  if (color) bg = color
  if (error) bg = 'red';
  const animationName = 'loading';
  const styles = `
    from{ 
      width: 5%;
    }
    to{
      width: 100%;
    }`;
  const progress = document.querySelector('.progress-bar');
  const styleTag = document.createElement('style');
  document.head.appendChild(styleTag);
  styleTag.sheet.insertRule(`@keyframes ${animationName} {${styles}}`, styleTag.length);
  progress.style.backgroundColor = bg;
  progress.style.animation = `${animationName} ${duration}s alternate`;
  setTimeout(() => {
    document.head.removeChild(styleTag);
  }, duration * 1000);
}

function formatDate(date, separator=' ') {
  const stringArray = new Date(date).toDateString().split(' ');
  /*
    toDateString() returns: 'Mon Dec 14 2020'
  */
  return stringArray.slice(1).join(separator);
}

function formatCurrency(value=0) {
  return new Intl.NumberFormat(
    'en-US',
    {
      minimumFractionDigits: 2
    }
  ).format(value)
}
