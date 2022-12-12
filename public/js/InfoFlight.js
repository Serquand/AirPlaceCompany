const priceModal = document.querySelector("#modal-price");
const priceChangerButton = document.querySelector(".button-container button");
const submitPrice = document.querySelector("#modal-price button")
const priceInput = document.querySelector("#modal-price input")
const cancelButton = document.querySelector(".button-container :last-child");
const idFlight = document.querySelector(".ticket button").id.split("-")[2];

priceChangerButton.addEventListener("click", () => priceModal.style.display = "block");

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
    const res = await fetch("/flight/" + idFlight, requestOptions)
    if(res.status == 400) {
        const alertModal = document.querySelector(".modal-alert")
        alertModal.style.display = "block";
        alertModal.querySelector("p").innerText = (await res.json()).information;
        return
    }

    priceChangerButton.innerText = priceInput.value + "€"
    priceModal.style.display = "none"
});

cancelButton.addEventListener("click", async () => {
    const res = await fetch("/flight/cancelFlight/" + idFlight, { method: "PATCH" })
    if(res.status == 400) alert("Somthing went wrong");
    else window.location.href = "/admin"    
})