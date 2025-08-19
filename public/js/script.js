document.addEventListener('DOMContentLoaded', function() {
	const searchBtn = document.querySelector('.searchBtn');
	const searchBar = document.querySelector('.search-bar');
	const searchClose = document.getElementById('searchClose');

	if (searchBtn && searchBar) {
		searchBtn.addEventListener('click', function(e) {
			e.preventDefault();
			searchBar.classList.add('active');
			searchBar.style.display = 'block';
		});
	}

	if (searchClose && searchBar) {
		searchClose.addEventListener('click', function() {
			searchBar.classList.remove('active');
			searchBar.style.display = 'none';
		});
	}

	// Hide search bar by default
	if (searchBar) {
		searchBar.style.display = 'none';
	}
});
