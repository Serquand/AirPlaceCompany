// Get the different element that we will use
const ticketsView = document.querySelectorAll(".bought-trip");
const createFlightButton = document.querySelector("#create-flight")
const modalCreate = document.querySelector('#modal-create-flight')
const dateDeparture = document.getElementById("date-departure-create")
const timeDeparture = document.getElementById("time-departure-create")
const airportDeparture = document.getElementById("departure-aiport-choice")
const dateArrival = document.getElementById("date-arrival-create")
const timeArrival = document.getElementById("time-arrival-create")
const airportArrival = document.getElementById("arrival-aiport-choice-form")
const price = document.getElementById("price-create")
const seat = document.getElementById("seat-create")
const meal = document.getElementById("meal-create")
const wifi = document.getElementById("wifi-create")

// Create the interaction of the button which redirect to the infoFlight page
ticketsView.forEach(ticket => {
    ticket.addEventListener("click", event => {
        idFlight = event.target.id.split("-")[2];
        window.location.href = "/infoFlight/ " + idFlight
    })
})

// Display the modal for creating a flight
createFlightButton.addEventListener("click", () => modalCreate.style.display = "block");

// Create a flight
const createFlight = async () => {
    const requestOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            dateDeparture: dateDeparture.value,
            timeDeparture: timeDeparture.value,
            airportDeparture: airportDeparture.value,
            dateArrival: dateArrival.value,
            timeArrival: timeArrival.value,
            airportArrival: airportArrival.value,
            price: price.value,
            seat: seat.value,
            meal: meal.checked,
            wifi: wifi.checked,
        })
    };

    // Fetch to the endpoint
    const res = await fetch("/flight/createFlight", requestOptions)
    
    // If the status is diffent than 201, display an alert
    if(res.status !== 201) {
        const alertModal = document.querySelector(".modal-alert")
        alertModal.style.display = "block";
        alertModal.querySelector("p").innerText = (await res.json()).information;
        return;
    } 

    window.location.href = "/admin";
}