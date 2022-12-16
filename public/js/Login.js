// Get the different element that we will use
let mode = "Login";

const titleChoice = document.getElementById("title-choice");
const switchSentence = document.querySelector("form > :last-child");
const inputEmail = document.querySelector("#email-login")
const inputPassword = document.querySelector("#password-login")
const form = document.querySelector("form");
const welcomeModal = document.querySelector(".welcome-modal-container");
const welcomeModalContinue = document.querySelector(".next-page-button");
const welcomePage = document.querySelector(".welcome-content");
const infoPage = document.querySelector(".info")
const nameInput = document.querySelector("#name-add")
const lastName = document.querySelector("#last-name-add")
const phone = document.querySelector("#phone-add")
const birthday = document.querySelector("#birthday-add");
const addSubmit = document.querySelector(".info button")

//Hidde the welcome modal
welcomeModal.style.display = "none";

// Toggle the login mode for register to login or for login to register
switchSentence.addEventListener("click", () => {
    mode = mode == "Login" ? "Register" : "Login";
    switchSentence.innerText = mode == "Login" ? "No account ?" : "Have an account ?"; 
    titleChoice.innerText = mode;
});

// When we submit the form
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
    const url = mode == "Login" ? "/user/signin" : "/user/register"

    // Fetch to the good endpoint
    const res = await fetch(url, requestOptions)
    
    // If we get a 200 response, so the user is well logged in
    if(res.status == 200) return window.location.href = "/member";

    // If we had an error, display an alert
    else if(res.status == 401 || res.status == 400) {
        const alertModal = document.querySelector(".modal-alert")
        alertModal.style.display = "block";
        alertModal.querySelector("p").innerText = (await res.json()).information;
        return;
    } else if(res.status == 201) { // If we got a 201 response, display the welcome modal
        welcomeModal.style.display = "block"; 
        infoPage.style.display = "none";
        return;
    }
})

// Display the form for adding information 
welcomeModalContinue.addEventListener("click", () => {
    welcomePage.style.display = "none";
    infoPage.style.display = "block";
    infoPage.classList.add("info-content")
})

addSubmit.addEventListener("click", async (event) => {
    event.preventDefault();

    const requestOptions = {
        method: "PATCH", 
        headers: {
            "Content-Type": "application/json"
        }, 
        body: JSON.stringify({
            name: nameInput.value, 
            lastName: lastName.value,
            phone: phone.value, 
            birthday: birthday.value,
        })
    };

    // Fetch to the good endpoint. If we got a 200 response, go to the member dashboard. Otherwise, display an alert
    const res = await fetch("/user/addInfo", requestOptions)
    if(res.status == 200) return window.location.href = "/member"
    
    const alertModal = document.querySelector(".modal-alert")
    alertModal.style.display = "block";
    alertModal.querySelector("p").innerText = (await res.json()).information;
})