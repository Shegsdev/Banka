/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
const modal = document.querySelector('.ad-modal');

function modalOpen(bool) {
  bool ? modal.style.display = 'block'
    : modal.style.display = 'none';
}

// Hamburger Menu

function openSlideMenu() {
  document.getElementById('side-menu').style.width = `${window.innerWidth}px`;
}

function closeSlideMenu() {
  document.getElementById('side-menu').style.width = '0';
}
