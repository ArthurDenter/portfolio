const button = document.getElementById("download-cv-button");

function timeout(ms) {
    let myPromise = new Promise(function (myResolve, myRejec) {
        setTimeout(myResolve("ok"), ms);
    });
    return myPromise;
}


function rotate(button) {
    button.addEventListener("mouseover", (event) => {
        button.classList.add("rotate-animation");
        // timeout(600).then((value) =>{
        //     console.log("ping")
        //     if (value === "ok")
        //         if (button.classList.contains("rotate-animation"))
        //             button.classList.remove("rotate-animation");
        // });
    });
    button.addEventListener("click", (event) => {
        button.classList.add("rotate-animation");
    });
    button.addEventListener("mouseout", (event) => {
        if (button.classList.contains("rotate-animation")) {
            button.classList.remove("rotate-animation");
        };
    });
};

rotate(button);