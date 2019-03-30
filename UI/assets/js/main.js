const modal = document.querySelector('.ad-modal');

function modalOpen(bool) {
	bool ? modal.style.display = 'block'
	: modal.style.display = 'none';
}

// Hamburger Menu

function openSlideMenu() {
	document.getElementById('side-menu').style.width = '300px';
}

function closeSlideMenu() {
	document.getElementById('side-menu').style.width = '0';
}
