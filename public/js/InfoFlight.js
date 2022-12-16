// Get the different element that we will use
const priceModal = document.querySelector("#modal-price");
const priceChangerButton = document.querySelector(".button-container button");
const submitPrice = document.querySelector("#modal-price button")
const priceInput = document.querySelector("#modal-price input")
const cancelButton = document.querySelector(".button-container :last-child");
const idFlight = document.querySelector(".ticket button").id.split("-")[2];

// When we click the button, display the modal for updating the price of a flight
priceChangerButton.addEventListener("click", () => priceModal.style.display = "block");

// When we submit the new price
submitPrice.addEventListener("click", async () => {
    const requestOptions = {
        method: 'PUT', 
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            price: priceInput.value
        })
    }
    
    //Fetch to the good endpoint 
    const res = await fetch("/flight/" + idFlight, requestOptions)
    
    // If we had an error, display an alert
    if(res.status == 400) {
        const alertModal = document.querySelector(".modal-alert")
        alertModal.style.display = "block";
        alertModal.querySelector("p").innerText = (await res.json()).information;
        return
    }

    // Updating the price displayed and hidde the modal
    priceChangerButton.innerText = priceInput.value + "€"
    priceModal.style.display = "none"
});

// When we click the button to cancel the flight
cancelButton.addEventListener("click", async () => {
    // Fetch to the good endpoint
    const res = await fetch("/flight/cancelFlight/" + idFlight, { method: "PATCH" })

    // If we had an error, display an alert. Otherwise, go to the admin dashboard
    if(res.status == 400) {
        const alertModal = document.querySelector(".modal-alert")
        alertModal.style.display = "block";
        alertModal.querySelector("p").innerText = "Something went wrong";
    } else window.location.href = "/admin"    
})