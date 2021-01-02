/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
const modal = document.querySelector('.ad-modal');
const modalContent = document.querySelector('.modal-content');

const showToast = (status, message = status) => {
  const toast = document.querySelector('.toast');
  let tag;
  if (toast.children.length === 1) {
    tag = document.createElement('figcaption');
  } else {
    // eslint-disable-next-line prefer-destructuring
    tag = toast.children[1];
  }
  tag.innerHTML = message;
  if (status) {
    toast.children[0].src = '/UI/assets/img/check-mark.gif';
    toast.classList.remove('toast-error');
    toast.classList.add('toast-success');
  }
  if (!status) {
    toast.children[0].src = '/UI/assets/img/cross-mark.jpg';
    toast.classList.remove('toast-success');
    toast.classList.add('toast-error');
  }
  toast.appendChild(tag);
  toast.style.display = 'block';
  // modalOpen(false);
  setTimeout(() => {
    toast.style.display = 'none';
  }, 2000);
};

function modalOpen(bool, action = 'undefined') {
  if (bool) {
    modal.style.display = 'block';
    modalContent.innerHTML = '';
    // Delete form
    const deleteForm = document.createElement('div');
    deleteForm.innerHTML = `
      <form action='#'>
        <header><h2>Confirm delete</h2></header>
        <div class='actions'>
          <button onclick='showToast(${true}, "Account deleted successfully.");return modalOpen(false)' class='button-red'>Delete</button>
          <button onclick='modalOpen(false)' class='button-blue'>Cancel</button>
        </div>
      </form>`;

    // Deactivate form
    const deactivateForm = document.createElement('div');
    deactivateForm.innerHTML = `
      <form action='#'>
        <header><h2>Confirm ${action}</h2></header>
        <div class='actions'>
          <button onclick='showToast(${true}, "${`Account ${action}d successfully.`}");return modalOpen(false)' class='button-red'>${action[0].toUpperCase() + action.slice(1)}</button>
          <button onclick='modalOpen(false)' class='button-blue'>Cancel</button>
        </div>
      </form>`;

    // Form display option
    action === 'delete' ? modalContent.appendChild(deleteForm)
      : modalContent.appendChild(deactivateForm);
  } else {
    modal.style.display = 'none';
  }
}

// Hamburger Menu

function openSlideMenu() {
  document.getElementById('side-menu').style.width = '85%';
}

function closeSlideMenu() {
  document.getElementById('side-menu').style.width = '0';
}

// Accordion menu
const accordion = document.getElementsByClassName('accordion');

for (let acc of accordion) {
  acc.addEventListener('click', function () {
    const panel = this.nextElementSibling;
      if (panel.style.display === 'block') {
        panel.style.display = 'none';
      }
      else panel.style.display = 'block';
  });
}

// More options pop-up
const ellipsis = document.querySelectorAll('.ellipsis');

for (let el of ellipsis) {
  el.addEventListener('click', function () {
    const options = document.querySelector('.more-options');
      if (options.style.display === 'block') {
        options.style.display = 'none';
      }
      else {
        options.style.display = 'block';
        options.style.position = 'absolute';
      }
  });
}
