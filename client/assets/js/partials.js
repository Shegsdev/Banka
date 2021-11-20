/* eslint-disable no-undef */
/* eslint-disable no-restricted-syntax */
/* eslint-disable func-names */

// Monitor Scroll
const nav = document.querySelector('#nav');
const bars = document.querySelector('.open-slide');
const list = nav.children[1].children[0].children;

window.onscroll = function () {
  if (window.scrollY > 50) {
    // nav
    nav.style.position = 'fixed';
    nav.style.background = '#fff';
    nav.style.top = 0;
    nav.style.right = 0;
    nav.style.left = 0;
    nav.style.padding = '0 40px';
    nav.style.transition = '0.5s all';
    nav.style.boxShadow = '0 2px 10px 1px rgba(0, 0, 0, 0.18)';

    // bars
    bars.style.color = '#000';

    // nav-links list
    for (const l of Array.from(list)) {
      const el = l.children[0];
      if (el.tagName === 'LI') el.style.color = '#e7e7e9';
      else if (el.tagName === 'EM') el.style.color = '#ff0000';
      else el.style.color = 'teal';
    }
  }
  if (window.scrollY < 50) {
    nav.style.position = 'relative';
    nav.style.background = 'none';
    nav.style.padding = '14px 40px';
    nav.style.transition = 'none';
    nav.style.boxShadow = '0 0px 0px 0px rgb(255, 255, 255)';

    bars.style.color = 'rgb(0, 147, 221)';

    for (const l of Array.from(list)) {
      const el = l.children[0];
      if (el.tagName === 'LI') {
        el.style.color = '#e7e7e9';
      } else if (el.parentElement.classList.contains('active')) el.style.color = 'teal';
      else el.style.color = '#e7e7e9';
    }
  }
};
