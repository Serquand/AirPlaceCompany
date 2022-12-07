let mode = "Login";

const titleChoice = document.getElementById("title-choice");
const switchSentence = document.querySelector("form > :last-child");

switchSentence.addEventListener("click", () => {
    mode = mode == "Login" ? "Register" : "Login";
    switchSentence.innerText = mode == "Login" ? "No account ?" : "Have an account ?"; 
    titleChoice.innerText = mode;
});