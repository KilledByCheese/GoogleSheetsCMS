const app = function () {
	const API_BASE = 'https://script.google.com/macros/s/AKfycbyJjyv05dbsKgcvHQCun12VTc-XIVp9i6_p0BiPS_X-9nxg-P5j/exec';
	const API_KEY = 'abcdef';
	const CATEGORIES = ['general', 'technology', 'funfacts', 'catFacts'];
	const AUTHORS = ['', 'KToffl', 'KilledByCheese', "I'm feeling curious", 'CatFacts-Bot'];

	const state = {activePage: 1, activeCategory: null, activeAuthor: ''};
	const page = {};

	function init () {
		page.notice = document.getElementById('notice');
		page.filter = document.getElementById('filter');
		page.container = document.getElementById('container');

		_buildFilter();
		buildAuthorSelection();
		_getNewPosts();
	}

	function _getNewPosts () {
		page.container.innerHTML = '';
		_getPosts();
	}

	function _getPosts () {
		_setNotice('Loading posts');

		fetch(_buildApiUrl(state.activePage, state.activeCategory, state.activeAuthor))
			.then((response) => response.json())
			.then((json) => {
				if (json.status !== 'success') {
					_setNotice(json.message);
				}

				_renderPosts(json.data);
				_renderPostsPagination(json.pages);
			})
			.catch((error) => {
				_setNotice('Unexpected error loading posts');
			})
	}

	function buildAuthorSelection () {
		const dropDown = document.createElement('select');
		AUTHORS.forEach(function(author) {
			var op = new Option();
			op.value = author;
			op.text = author;
			if(author === '') {
				op.text = 'All authors - select to filter';
			}
			dropDown.options.add(op);
		});
		dropDown.onchange = function (event) {
			_resetActivePage();
			setActiveAuthor(dropDown.value);
			_getNewPosts();
		}
		page.filter.appendChild(dropDown);
	}

	function _buildFilter () {
	    page.filter.appendChild(_buildFilterLink('no filter', true));

	    CATEGORIES.forEach(function (category) {
	    	page.filter.appendChild(_buildFilterLink(category, false));
	    });
	}

	function _buildFilterLink (label, isSelected) {
		const link = document.createElement('button');
	  	link.innerHTML = _capitalize(label);
	  	link.classList = isSelected ? 'selected' : '';
	  	link.onclick = function (event) {
			
	  		let category = label === 'no filter' ? null : label.toLowerCase();

			_resetActivePage();
	  		_setActiveCategory(category);
	  		_getNewPosts();
			
	  	};

	  	return link;
	}

	function _buildApiUrl (page, category, author) {
		let url = API_BASE;
		url += '?key=' + API_KEY;
		url += '&page=' + page;
		url += category !== null ? '&category=' + category : '';
		url += author !== null ? '&author=' + author : '';

		return url;
	}

	function _setNotice (label) {
		page.notice.innerHTML = label;
	}

	function _renderPosts (posts) {
		posts.forEach(function (post) {
			const article = document.createElement('article');
			const category = 'category_' + post.category;
			article.innerHTML = `
				<h2>${post.title}</h2>
				<div class="article-details">
					<div>By ${post.author} on ${_formatDate(post.zeitstempel)}</div>
					<div class="${category}">Posted in ${post.category}</div>
				</div>
				${_formatContent(post.content)}
			`;
			page.container.appendChild(article);
		});
	}

	function _renderPostsPagination (pages) {
		if (pages.next) {
			const link = document.createElement('button');
			link.innerHTML = 'Load more posts';
			link.onclick = function (event) {
				_incrementActivePage();
				_getPosts();
			};

			page.notice.innerHTML = '';
			page.notice.appendChild(link);
		} else {
			_setNotice('No more posts to display');
		}
	}

	function _formatDate (string) {
		return new Date(string).toLocaleDateString('en-GB');
	}

	function _formatContent (string) {
		return string.split('\n')
			.filter((str) => str !== '')
			.map((str) => `<p>${str}</p>`)
			.join('');
	}

	function _capitalize (label) {
		return label.slice(0, 1).toUpperCase() + label.slice(1).toLowerCase();
	}

	function _resetActivePage () {
		state.activePage = 1;
	}

	function _incrementActivePage () {
		state.activePage += 1;
	}

	function _setActiveCategory (category) {
		state.activeCategory = category;
		
		const label = category === null ? 'no filter' : category;
		Array.from(page.filter.children).forEach(function (element) {
  			element.classList = label === element.innerHTML.toLowerCase() ? 'selected' : '';
  		});
	}

	function setActiveAuthor (author) {
		state.activeAuthor = author;
	}

	return {
		init: init
 	};
}();
