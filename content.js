
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


// Re-route search

const sidebar = document.body.getElementsByClassName("sidebar-category-wrap")[0];
const searchBut = sidebar.getElementsByClassName("fa-search")[0].parentNode;

const newSearchBut = searchBut.cloneNode(true);
searchBut.parentNode.replaceChild(newSearchBut, searchBut);
newSearchBut.addEventListener('click', e => {
	alert("hi there");
});

const test = document.createElement("p");
test.innerHTML = "done!";
sidebar.appendChild(test);