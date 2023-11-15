// When the user scrolls the page, execute myFunction
window.onscroll = function() {
    myFunction()
};

// Get the navbar
let navbar = document.getElementById("navbar");
let contentSection = document.getElementById("content-section");

// Get the offset position of the navbar
let fixed = navbar.offsetTop;

// Add the sticky class to the navbar when you reach its scroll position. Remove "sticky" when you leave the scroll position
function myFunction() {
    console.log(`fixed: ${fixed}`);
    console.log(`pageYOffset: ${window.pageYOffset}`);
  if (window.pageYOffset > fixed) {
    navbar.classList.add("navbar-fixed");
    contentSection.classList.add("content-section-fixed");
  } else {
    navbar.classList.remove("navbar-fixed");
    contentSection.classList.remove("content-section-fixed");
    console.log(`remove class: navbar-fixed`);
  };
}; 