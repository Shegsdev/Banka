/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
const modal = document.querySelector('.ad-modal');
const modalContent = document.querySelector('.modal-content');

const showToast = (status, message = status) => {
  window.scrollTo(null, 0);
  const successToast = document.querySelector('.success');
  const errorToast = document.querySelector('.error');
  let tag;
  if (status) toast = successToast;
  else toast = errorToast;
  if (toast.children.length === 1) {
    tag = document.createElement('figcaption');
  } else {
    // eslint-disable-next-line prefer-destructuring
    tag = toast.children[1];
  }
  tag.innerHTML = message;
  tag.style.fontSize = '13px';
  toast.appendChild(tag);
  toast.style.display = 'block';
  setTimeout(() => {
    toast.style.display = 'none';
  }, 2500);
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

// Loader
function renderLoader(el, display) {
  const loader = document.createElement("div");
  loader.setAttribute("class", "loader");

  document.body.append(loader);
  setTimeout(() => {
    if (document.readyState == 'complete') {
      document.body.removeChild(loader);
      el.style.display = display;
    }
  }, 2500);
}
