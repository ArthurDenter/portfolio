let windowHeight = 0;
let windowWidth = 0;

function updateSize() {
  windowHeight = window.innerHeight;
  windowWidth = window.innerWidth;
  console.log(`window height: ${windowHeight}`);
  console.log(`window width: ${windowWidth}`);
}

updateSize();
window.addEventListener("resize", updateSize);
window.addEventListener("scroll", (e)=>{
    const name = document.getElementById("name_container");

    let nameOffsetTop = name.offsetTop;
    let nameParentOffset = name.offsetParent;
    if (nameParentOffset === null || typeof(nameParentOffset) === "object") nameParentOffset = 0;
    let nameRelativeOffsetTop = nameOffsetTop + nameParentOffset - window.scrollY;

    // console.log(`nameOffsetTop: ${nameOffsetTop}`);
    // console.log(`nameParentOffset: ${nameParentOffset}`);
    // console.log(`nameRelativeOffsetTop: ${nameRelativeOffsetTop}`);

    if (nameRelativeOffsetTop < (windowHeight/2)){
        name.classList.add("active");
    } else {
        if(name.classList.contains("active"))
            name.classList.remove("active");
    };
});