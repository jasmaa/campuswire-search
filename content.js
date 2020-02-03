
/**
 * Filters posts
 * @param {*} searchTerms 
 */
const filterPosts = (searchTerms) => {

	// Create post data
	let postData = [];
	const postList = document.body.getElementsByClassName("posts-list-wrap")[0];
	for (post of postList.getElementsByClassName("post-preview-wrapper")) {
		const preview = post.getElementsByClassName("post-preview")[0];
		const title = preview
			.getElementsByClassName("post-title")[0]
			.getElementsByTagName("H3")[0]
			.innerHTML;
		const text = preview
			.getElementsByClassName("post-text-wrap")[0]
			.getElementsByClassName("post-text")[0]
			.innerHTML;

		postData.push({
			post: post,
			title: title,
			text: text,
		});
	}

	// Fuzzy search
	const options = {
		shouldSort: true,
		threshold: 0.6,
		location: 0,
		distance: 100,
		maxPatternLength: 32,
		minMatchCharLength: 1,
		keys: [
			"title",
			"text",
		]
	};
	const fuse = new Fuse(postData, options);

	if (searchTerms == "") {
		for (post of postData) {
			post.post.style.display = 'block';
			post.post.classList.add('d-flex');
		}
	} else {
		const filteredPosts = fuse.search(searchTerms);

		for (post of postData) {
			post.post.style.display = 'none';
			post.post.classList.remove('d-flex');
		}

		for (post of filteredPosts) {
			post.post.style.display = 'block';
			post.post.classList.add('d-flex');
		}
	}
}

/**
 * Initializes search bar
 */
const initSearchBar = () => {
	const sidebar = document.body.getElementsByClassName("sidebar-category-wrap")[0];
	const searchBut = sidebar.getElementsByClassName("fa-search")[0].parentNode;
	searchBut.remove();

	const searchControl = document.createElement("DIV");
	searchControl.className = "sidebar-category-wrap d-flex align-items-center search-control";

	const searchBar = document.createElement("INPUT");
	searchBar.className = "form-control";
	searchBar.addEventListener('input', e => {
		filterPosts(searchBar.value);
	})
	searchControl.appendChild(searchBar);

	const searchIcon = document.createElement("I");
	searchIcon.className = "far fa-search";
	searchControl.appendChild(searchIcon);

	sidebar.after(searchControl);
}

// Load content
const loader = setInterval(() => {
	if (document.body.getElementsByClassName("posts-list-wrap")) {
		initSearchBar();
	}
}, 1_000);