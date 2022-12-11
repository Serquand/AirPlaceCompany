const ticketsView = document.querySelectorAll(".bought-trip");

ticketsView.forEach(ticket => {
    ticket.addEventListener("click", event => {
        idFlight = event.target.id.split("-")[2];
        window.location.href = "/infoFlight/ " + idFlight
    })
})