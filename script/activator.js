let windowHeight = 0;
let windowWidth = 0;

let scrollPosition = 0;
let positiveScrollDirection = true;

function updateSize() {
    windowHeight = window.innerHeight;
    windowWidth = window.innerWidth;
}

updateSize();
window.addEventListener("resize", updateSize);
window.addEventListener("scroll", (e) => {
    const name = document.getElementById("name_container");
    const address = document.getElementById("address_container");
    const skills = document.getElementById("skills_container");
    const motivation = document.getElementById("motivation_container");
    const experience = document.getElementById("experience_container");

    let nameOffsetTop = name.offsetTop;
    let addressOffsetTop = address.offsetTop;
    let skillsOffsetTop = skills.offsetTop;

    let nameRelativeOffsetTop = nameOffsetTop - window.scrollY;
    let addressRelativeOffsetTop = addressOffsetTop - window.scrollY;
    let skillsRelativeOffsetTop = skillsOffsetTop - window.scrollY;

    let skillArr = document.querySelectorAll(".skill");
    let skillsContainerHeight = skills.offsetHeight;
    let delta = skillsContainerHeight / skillArr.length; //scrollablePixelPerSkill
    let skillContainerPerScroll = Math.floor(((windowHeight / 2) - skillsRelativeOffsetTop) / delta);

    if (scrollPosition < window.scrollY){
        positiveScrollDirection = true;
        scrollPosition = window.scrollY;
    } else {
        positiveScrollDirection = false;
        scrollPosition = window.scrollY;
    }

    console.log(`delta : ${delta}`);
    console.log(`window.scrollY: ${window.scrollY}`);
    console.log(`browser center (cap): ${windowHeight / 2}`)

    console.log(`skillsRelativeOffsetTop: ${skillsRelativeOffsetTop}`);
    console.log(`skillContainerPerScroll: ${skillContainerPerScroll}`);
    console.log(`positiveScrollDirection: ${positiveScrollDirection}`);


    if (nameRelativeOffsetTop < (windowHeight / 2)) {
        name.classList.add("active");
    } else {
        if (name.classList.contains("active"))
            name.classList.remove("active");
    };

    if (addressRelativeOffsetTop < (windowHeight / 2)) {
        address.classList.add("active");
    } else {
        if (address.classList.contains("active"))
            address.classList.remove("active");
    };

    if (skillContainerPerScroll <= 16 && skillContainerPerScroll >= 0){
        if ( positiveScrollDirection === true && (skillArr.item(skillContainerPerScroll).getAttribute("id") === null )) {
            console.log("play – active hinzugefügt");
            for (let i = 0; i<= skillContainerPerScroll; i++){
                skillArr.item(i).setAttribute("id", "active");
            };
        }else if (positiveScrollDirection === false && (skillArr.item(skillContainerPerScroll).getAttribute("id") === "active")) {
            console.log("reverse – active reset");
            for (let i = 0; i <16; i++){
                skillArr.item(i).removeAttribute("id");
            };
            console.log("reverse – active renew");
            for (let j = 0; j<= skillContainerPerScroll; j++){
                skillArr.item(j).setAttribute("id", "active");
            };
        };
    }else if (skillContainerPerScroll <0) {
        skillArr.item(0).removeAttribute("id")
    }else if (skillContainerPerScroll >16){
        for (let j = 0; j<= 16; j++){
            skillArr.item(j).setAttribute("id", "active");
        };
    };

    
});