let currentScrollPosition = 0;

// Get the navbar
let navbar = document.getElementById("navbar");
let contentSection = document.getElementById("content-section");

// Get the offset position of the navbar
let fixed = navbar.offsetTop;

// When the user scrolls the page, execute myFunction
window.onscroll = function () {
  // myFixedNavigationBar()
  toggleNavBar();
};

function getScrollDirection(lastScrollPosition) {
  if (lastScrollPosition < currentScrollPosition) {
    currentScrollPosition = lastScrollPosition;
    return "positive";
  } else {
    currentScrollPosition = lastScrollPosition;
    return "negative";
  };
};

function toggleNavBar() {
  let scrollDirection = getScrollDirection(window.scrollY);
  if (scrollDirection === "positive") {
    console.log("fade in nav");
    if (navbar.classList.contains("fade-out")) {
      setTimeout(() => {
        navbar.classList.remove("fade-out");
        navbar.classList.add("fade-in");
      }, 600);
    };
  } else if (scrollDirection === "negative" && window.scrollY > 100) {
    console.log("fade out nav");
    if (navbar.classList.contains("fade-in")) {
      setTimeout(() => {
        navbar.classList.remove("fade-in");
        navbar.classList.add("fade-out");
      }, 600);
    };
  };
};

// Add the sticky class to the navbar when you reach its scroll position. Remove "sticky" when you leave the scroll position
function myFixedNavigationBar() {
  if (window.scrollY > fixed) {
    navbar.classList.add("navbar-fixed");
    contentSection.classList.add("content-section-fixed");
  } else {
    navbar.classList.remove("navbar-fixed");
    contentSection.classList.remove("content-section-fixed");
  };
};

let burgerMenuButton = document.getElementById("menubutton-container");
let dropDownMenu = document.getElementById("menu-container");

burgerMenuButton.addEventListener("click", (e) => {
  if (dropDownMenu.classList.contains("menu-container-toggled") === false) {
    dropDownMenu.classList.add("menu-container-toggled");
  }
  else {
    dropDownMenu.classList.remove("menu-container-toggled");
  };
});