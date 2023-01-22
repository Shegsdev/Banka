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

function openSlideMenu(el) {
  const hmbg = el.firstElementChild.firstElementChild;
  // Replace icon
  const classList = hmbg.classList;
  if (classList.contains('fa-align-right')) {
    hmbg.style.color = '#fff';
    hmbg.classList.replace('fa-align-right', 'fa-times');
    document.getElementById('side-menu').style.width = '100%';
    return;
  }
  hmbg.style.color = '#4F4D53';
  hmbg.classList.replace('fa-times', 'fa-align-right');
  document.getElementById('side-menu').style.width = '0';
  return;
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
const addEvent = async () => {
  const ellipsis = await document.querySelectorAll('.ellipsis');

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
};

setTimeout(addEvent, 5000);

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
  }, 300);
}

// Dropdown menu
function openDropDown(bool) {
  const dropdown = document.getElementById('dropdown');
  if (!dropdown) return;
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
