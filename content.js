
document.body.style.border = "5px solid green";

let postData = [];

// Scrape posts
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
	postData.push({ title: title, text: text });
}

const filterPosts = (keyword) => {
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

		//put fuzzy check here
		if (text.includes(keyword) || title.includes(keyword)) {
			post.style.display = 'block';
			post.classList.add('d-flex');
		} else {
			post.style.display = 'none';
			post.classList.remove('d-flex');
		}
	}
}


// Re-route search
const sidebar = document.body.getElementsByClassName("sidebar-category-wrap")[0];
const searchBut = sidebar.getElementsByClassName("fa-search")[0].parentNode;
searchBut.remove();

const searchControl = document.createElement("DIV");
searchControl.className = "sidebar-category-wrap d-flex align-items-center search-control";

const searchBar = document.createElement("INPUT");
searchBar.className = "form-control";
searchBar.addEventListener('input', e => {
	console.log(searchBar.value);
	filterPosts(searchBar.value);
})
searchControl.appendChild(searchBar);

const searchIcon = document.createElement("I");
searchIcon.className = "far fa-search";
searchControl.appendChild(searchIcon);

sidebar.after(searchControl);