/* eslint-disable func-names */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
const modal = document.querySelector('.ad-modal');
const modalContent = document.querySelector('.modal-content');

function modalOpen(bool, action = 'undefined') {
  modalContent.innerHTML = '';
  // Delete form
  const deleteForm = document.createElement('div');
  deleteForm.innerHTML = `
    <form action='#'>
      <header><h2>Confirm delete</h2></header>
      <div class='actions'>
        <button type='submit' class='button-red'>Delete</button>
        <button onclick='modalOpen(false)' class='button-blue'>Cancel</button>
      </div>
    </form>`;

  // Deactivate form
  const deactivateForm = document.createElement('div');
  deactivateForm.innerHTML = `
    <form action='#'>
      <header><h2>Confirm ${action}</h2></header>
      <div class='actions'>
        <button type='submit' class='button-red'>${action[0].toUpperCase() + action.slice(1)}</button>
        <button onclick='modalOpen(false)' class='button-blue'>Cancel</button>
      </div>
    </form>`;

  // Form display option
  action === 'delete' ? modalContent.appendChild(deleteForm)
    : modalContent.appendChild(deactivateForm);

  // Modal display option
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

// Dropdown menu
function openDropDown(bool) {
  const dropdown = document.getElementById('dropdown');
  // Dropdow display option
  bool ? dropdown.style.display = 'block'
    : dropdown.style.display = 'none';
}

// Close the dropdown if the user clicks outside of it
window.onclick = function (e) {
  if (!e.target.matches('.dropbtn')) {
    openDropDown(false);
  }
};

// Accordion menu
const accordion = document.getElementsByClassName('accordion');

for (let acc of accordion) {
  acc.addEventListener('click', function () {
    const panel = this.nextElementSibling;
    const options = acc.children[1];
    if (panel.tagName !== 'TD') {
      if (panel.style.display === 'block') {
        panel.style.display = 'none';
      } else {
        panel.style.display = 'block';
      }
    }
      // Table on dashboard
      if (options.style.display === 'block') {
        options.style.display = 'none';
      } else {
        options.style.display = 'block';
      }
  });
}
