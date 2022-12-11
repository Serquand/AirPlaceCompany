const ticketsView = document.querySelectorAll(".bought-trip");
const createFlightButton = document.querySelector("#create-flight")
const modalCreate = document.querySelector('#modal-create-flight')

ticketsView.forEach(ticket => {
    ticket.addEventListener("click", event => {
        idFlight = event.target.id.split("-")[2];
        window.location.href = "/infoFlight/ " + idFlight
    })
})

createFlightButton.addEventListener("click", () => modalCreate.style.display = "block");