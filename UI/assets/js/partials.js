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
    nav.style.boxShadow = '0 2px 10px 1px rgba(0, 0, 0, 0.18)';

    // bars
    bars.style.color = '#000';

    // nav-links list
    for (const l of Array.from(list)) {
      l.children[0].style.color = '#ff1967';
    }
    // active link border-bottom
    for (const l of list) {
      if (l.className === 'active') {
        l.style.borderColor = '#ff1967';
      }
    }
  }
  if (window.scrollY < 50) {
    nav.style.position = 'relative';
    nav.style.background = 'none';
    nav.style.boxShadow = '0 0px 0px 0px rgb(255, 255, 255)';

    bars.style.color = '#fff';

    for (const l of Array.from(list)) {
      l.children[0].style.color = '#e7e7e9';
    }

    for (const l of list) {
      if (l.className === 'active') {
        l.style.borderColor = '#e7e7e9';
      }
    }
  }
};
