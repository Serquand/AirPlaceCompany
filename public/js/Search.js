const container = document.querySelectorAll(".booking-form-component.search-airport");
const tickets = document.querySelectorAll("#buy-tickets > div")

for(let i = 0; i < Math.min(10, tickets.length); i++) tickets[i].style.display = "flex";

for (const c of container) {
    console.log(c);
    c.querySelector("input").addEventListener("input", (event) => {
        let pos = 0;
        const airports = c.querySelectorAll(".airport-choice");
        for (const airport of airports) {
            if(event.target.value.length == 0) {
                airport.style.display = "none"
                continue
            }
            
            if(pos == 5) break;
    
            if(airport.innerText.split("(")[0].trim().toUpperCase().startsWith(event.target.value.toUpperCase())) {
                airport.style.display = "block";
                airport.style.transform = `translateY(${++pos}00%)`
                continue;
            }
            
            airport.style.display = "none" 
        }
    });
}

for (const c of container) {
    const allAirport = c.querySelectorAll(".airport-choice")
    allAirport.forEach((airport) => {
        airport.addEventListener("click", (event) => {
            if(event.target.innerText.length !== 5) c.querySelector("input").value = event.target.innerText;
            else c.querySelector("input").value = event.target.parentNode.innerText;
            allAirport.forEach((airport) => {
                airport.style.display = "none";
            })  
        })
    })
}

document.querySelector("#button-search-flight").addEventListener("click", () => {
    const airportArrival = document.getElementById("arrival-aiport-choice").value
    const airportDeparture = document.getElementById("departure-airport-choice").value
    let date = document.getElementById("date-choice").value.split("-")
    date = date[2] + "/" + date[1] + "/" + date[0]
    let find = false 

    tickets.forEach(ticket => {
        const ticketArrival = ticket.querySelector(".dest > :last-child").innerText
        const ticketDeparture = ticket.querySelector(".dest > :first-child").innerText
        const ticketDate = ticket.querySelector(".date").innerText
        
        if(ticketDate == date && ticketArrival == airportArrival && ticketDeparture == airportDeparture) {
            ticket.style.display = "flex"
            find = true;
            return;
        }
        ticket.style.display = "none"
    })

    if(!find) document.querySelector(".tickets-container h2").innerText = "We found no flight for you !"
});