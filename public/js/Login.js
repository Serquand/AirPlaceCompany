let mode = "Login";

const titleChoice = document.getElementById("title-choice");
const switchSentence = document.querySelector("form > :last-child");
const inputEmail = document.querySelector("#email-login")
const inputPassword = document.querySelector("#password-login")
const form = document.querySelector("form");

switchSentence.addEventListener("click", () => {
    mode = mode == "Login" ? "Register" : "Login";
    switchSentence.innerText = mode == "Login" ? "No account ?" : "Have an account ?"; 
    titleChoice.innerText = mode;
});

form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const requestOptions = {
        method: "POST", 
        headers: {
            "Content-Type": "application/json"
        }, 
        body: JSON.stringify({
            email: inputEmail.value, 
            pwd: inputPassword.value
        })
    };
    const url = mode == "Login" ? "http://localhost:5000/user/signin" : "http://localhost:5000/user/register"

    await fetch(url, requestOptions)
})