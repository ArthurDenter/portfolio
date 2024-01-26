let lastKnownScrollPosition = 0;
let projects = document.querySelectorAll(".project");
let readMoreLink = document.querySelector(".link");
let readMoreLinkContainer = document.querySelector(".project-link-more-nav");
// Setup isScrolling variable
let isScrolling;

function getVerticalCenter() {
    return window.innerHeight / 2;
}

function hasFocus(element) {
    // let center = getVerticalCenter();
        if (((element.offsetTop - window.scrollY) <= 1) && ((element.offsetTop - window.scrollY) >= -1)) {
            if (!(element.classList.contains("hasFocus"))) {
                element.classList.add("hasFocus");
                readMoreLink.setAttribute("href", "/projects/" + element.getAttribute("id") + ".html");
                if (!(element.getAttribute("id") === "motivation")) {
                    readMoreLinkContainer.style.display = "block";
                } else {
                    readMoreLinkContainer.style.display = "none";
                };
            };
        } else {
            if (element.classList.contains("hasFocus")) {
                element.classList.remove("hasFocus");
            };
        };
};

// console.log(readMoreLink);

// let scrollHandler = document.addEventListener("scrollend", (e) => {
//     lastKnownScrollPosition = window.scrollY;
//     let elementWithFocus = projects.forEach(hasFocus);
// });



// Listen for scroll events
window.addEventListener('scroll', function ( event ) {

	// Clear our timeout throughout the scroll
	window.clearTimeout( isScrolling );

	// Set a timeout to run after scrolling ends
	isScrolling = setTimeout(function() {

		// Run the callback
		console.log( 'Scrolling has stopped.' );
        lastKnownScrollPosition = window.scrollY;
        let elementWithFocus = projects.forEach(hasFocus);

	}, 66);

}, false);
