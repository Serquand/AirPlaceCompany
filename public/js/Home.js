const ticketsBought = document.querySelectorAll(".bought-trip");
const modalBought = document.querySelector(".modal-bought");
const select = document.querySelector("select");
const priceDisplay = document.querySelector("#price-for-tickets")
const confirmBoughtButton = document.querySelector("#confirm-trade")

let idFlight, price;

ticketsBought.forEach(ticket => {
    ticket.addEventListener("click", event => {
        idFlight = event.target.id.split("-")[2];
        price = document.querySelector("#button-ticket-" + idFlight).innerText.split(":")[1].trim().split("€")[0]
        modalBought.style.display = "block";
        priceDisplay.innerText = price
    })
})

select?.addEventListener("change", event => {
    priceDisplay.innerText = (price * event.target.value).toString()
})

confirmBoughtButton?.addEventListener("click", async event => {
    const numberTicket = select.value;
    const requestOptions = {
        method: "POST", 
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            flight: idFlight,
            numberTicket
        })
    };

    const res = await fetch("/flight/bought", requestOptions);

    if(res.status != 201) {
        const alertModal = document.querySelector(".modal-alert")
        alertModal.style.display = "block";
        alertModal.querySelector("p").innerText = (await res.json()).information;
    }

    window.location.href = "/member";
})