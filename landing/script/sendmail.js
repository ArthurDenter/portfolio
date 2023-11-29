const sendMail = (mail) => {
    fetch("http://localhost:3000/send", {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        body: mail,
    }).then((response) => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        };
        return response.json();
    });
};

const form = document.getElementById("mailform");

const formEvent = form.addEventListener("submit", (e) => {
    e.preventDefault();
    let mail = new FormData(form);
    sendMail(mail);
});