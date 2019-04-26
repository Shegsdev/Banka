/* eslint-disable func-names */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
// Dropdown menu
function openDropDown(bool) {
  const dropdown = document.getElementById('dropdown');
  // Dropdow display option
  bool ? dropdown.style.display = 'block'
    : dropdown.style.display = 'none';
}

// Aside
(function () {
  const aside = document.querySelector('aside');
  aside.style.height = `${window.innerHeight}px`;
  return true;
}());

// Close the dropdown if the user clicks outside of it
window.onclick = function (e) {
  if (!e.target.matches('.dropbtn')) {
    openDropDown(false);
  }
};
