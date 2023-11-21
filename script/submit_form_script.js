let mailForm = document.getElementById("Mailform");

mailForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const value = Object.fromEntries(data.entries());
    console.log(value);
});