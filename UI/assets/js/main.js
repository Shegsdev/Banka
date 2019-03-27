const modal = document.querySelector('.ad-modal');

function modalOpen(bool) {
	bool ? modal.style.display = 'block' :
		   modal.style.display = 'none';
}