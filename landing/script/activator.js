let windowHeight = 0;
let windowWidth = 0;

let scrollPosition = 0;
let positiveScrollDirection = true;

function updateSize() {
    windowHeight = window.innerHeight;
    windowWidth = window.innerWidth;
}

function extractMarkContent(input) {
    const regex = /<mark>(.*?)<\/mark>/s;
    const match = input.match(regex);
    return match ? match[1] : input;
}

updateSize();
window.addEventListener("resize", updateSize);
window.addEventListener("scroll", (e) => {
    const name = document.getElementById("name_container");
    const address = document.getElementById("address_container");
    const skills = document.getElementById("skills_container");
    const motivation = document.getElementById("motivation_content");
    const experience = document.getElementById("experience_container");

    //Abstand zum oberen Rand im Browserfenster
    let nameOffsetTop = name.offsetTop;
    let addressOffsetTop = address.offsetTop;
    let skillsOffsetTop = skills.offsetTop;
    let motivationOffsetTop = motivation.offsetTop;
    let experienceOffsetTop = experience.offsetTop;

    //relativer Abstand zum oberen Rand im Browserfenster — abhängig von Scrollposition
    let nameRelativeOffsetTop = nameOffsetTop - window.scrollY;
    let addressRelativeOffsetTop = addressOffsetTop - window.scrollY;
    let skillsRelativeOffsetTop = skillsOffsetTop - window.scrollY;
    let motivationRelativeOffsetTop = motivationOffsetTop - window.scrollY;
    let experienceRelativeOffsetTop = experienceOffsetTop - window.scrollY;

    let skillArr = document.querySelectorAll(".skill");
    let wordArrFromMotivation = motivation.innerText.split(" ");

    let skillsContainerHeight = skills.offsetHeight;
    let motivationContainerHeight = motivation.offsetHeight;

    let deltaSkills = skillsContainerHeight / skillArr.length; //scrollablePixelPerSkill
    let deltaMotivation = motivationContainerHeight / wordArrFromMotivation.length; //scrollablePixelPerWord

    let skillContainerPerScroll = Math.floor(((windowHeight / 2) - skillsRelativeOffsetTop) / deltaSkills);
    let motivationWordsPerScroll = Math.floor(((windowHeight / 2) - motivationRelativeOffsetTop) / deltaMotivation);


    //Bestimmt ob in positiver oder negativer Richtung gescrollt wird. <--- in Funktion umwandeln
    if (scrollPosition < window.scrollY) {
        positiveScrollDirection = true;
        scrollPosition = window.scrollY;
    } else {
        positiveScrollDirection = false;
        scrollPosition = window.scrollY;
    }

    // console.log("---------------------------------------");
    // console.log(`Anzahl der Wörter: ${wordArrFromMotivation.length}`)
    // console.log(`deltaMotivation : ${deltaMotivation}`);
    // console.log(`window.scrollY: ${window.scrollY}`);
    // console.log(`browser center (cap): ${windowHeight / 2}`)

    // console.log(`motivationRelativeOffsetTop: ${motivationRelativeOffsetTop}`);
    // console.log(`motivationWordsPerScroll: ${motivationWordsPerScroll}`);
    // console.log(`positiveScrollDirection: ${positiveScrollDirection}`);


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

    if (experienceRelativeOffsetTop < (windowHeight / 2)) {
        let experienceLi = document.querySelectorAll(".experience-container-li");
        experienceLi.forEach((element)=>{
            let elementOffsetTop = element.offsetTop;
            let elementRelativeOffsetTop = elementOffsetTop - scrollY;

            if (elementRelativeOffsetTop < (windowHeight / 2)) {
                element.classList.add("active");
            } else {
                if (element.classList.contains("active"))
                    element.classList.remove("active");
            };
        });
    } else {
        let experienceLi = document.querySelectorAll(".experience-container-li");
        experienceLi.forEach((element)=>{
            if (element.classList.contains("active"))
                    element.classList.remove("active");
        });
    }

    if (skillContainerPerScroll < skillArr.length && skillContainerPerScroll >= 0) {
        if (positiveScrollDirection === true && (skillArr.item(skillContainerPerScroll).getAttribute("id") === null)) {
            for (let i = 0; i <= skillContainerPerScroll; i++) {
                skillArr.item(i).setAttribute("id", "active");
            };
        } else if (positiveScrollDirection === false && (skillArr.item(skillContainerPerScroll).getAttribute("id") === "active")) {
            for (let i = 0; i <= skillArr.length - 1; i++) {
                skillArr.item(i).removeAttribute("id");
            };
            for (let j = 0; j <= skillContainerPerScroll; j++) {
                skillArr.item(j).setAttribute("id", "active");
            };
        };
    } else if (skillContainerPerScroll < 0) {
        for (let j = 0; j <= skillArr.length - 1; j++) {
            skillArr.item(j).removeAttribute("id");
        };
    } else if (skillContainerPerScroll > 16) {
        for (let j = 0; j <= skillArr.length - 1; j++) {
            skillArr.item(j).setAttribute("id", "active");
        };
    };

    if (motivationWordsPerScroll < wordArrFromMotivation.length && motivationWordsPerScroll >= 0) {
        if (positiveScrollDirection === true) {
            for (let i = 0; i <= motivationWordsPerScroll; i++) {
                wordArrFromMotivation[i] = "<mark>" + wordArrFromMotivation[i] + "</mark>";
            };
        } else if (positiveScrollDirection === false) {
            for (let i = 0; i <= wordArrFromMotivation.length - 1; i++) {
                wordArrFromMotivation[i] = extractMarkContent(wordArrFromMotivation[i]);
            };
            for (let i = 0; i <= Math.min(wordArrFromMotivation.length - 1, motivationWordsPerScroll); i++) {
                wordArrFromMotivation[i] = "<mark>" + wordArrFromMotivation[i] + "</mark>";
            };
        }
    }
    else if (motivationWordsPerScroll < 0) {
        for (let i = 0; i <= wordArrFromMotivation.length - 1; i++) {
            wordArrFromMotivation[i] = extractMarkContent(wordArrFromMotivation[i]);
        };
    } else if (motivationWordsPerScroll >= wordArrFromMotivation.length) {
        for (let i = 0; i <= wordArrFromMotivation.length - 1; i++) {
            wordArrFromMotivation[i] = "<mark>" + wordArrFromMotivation[i] + "</mark>";
        };
    };
    motivation.innerHTML = wordArrFromMotivation.join(" ");

});