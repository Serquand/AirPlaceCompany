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

ticketsView.forEach(ticket => {
    ticket.addEventListener("click", event => {
        idFlight = event.target.id.split("-")[2];
        window.location.href = "/infoFlight/ " + idFlight
    })
})

createFlightButton.addEventListener("click", () => modalCreate.style.display = "block");

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

    const res = await fetch("/flight/createFlight", requestOptions)
    
    if(res.status !== 200) return;
    
    modalCreate.style.display = "none"
}