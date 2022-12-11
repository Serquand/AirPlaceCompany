const container = document.querySelectorAll(".booking-form-component");
const tickets = document.querySelectorAll("#buy-tickets > div")

container[0].querySelector("input").addEventListener("input", (event) => {
    let pos = 0;
    const airports = container[0].querySelectorAll(".airport-choice");
    for (const airport of airports) {
        if(event.target.value.length == 0) {
            airport.style.display = "none"
            continue
        }
        
        if(airport.innerText.split("(")[0].trim().toUpperCase().startsWith(event.target.value.toUpperCase())) {
            airport.style.display = "block";
            airport.style.transform = `translateY(${++pos}00%)`
            continue
        }
        
        airport.style.display = "none" 
    }
});

container[1].querySelector("input").addEventListener("input", (event) => {
    let pos = 0;
    const airports = container[1].querySelectorAll(".airport-choice");
    for (const airport of airports) {
        if(event.target.value.length == 0) {
            airport.style.display = "none"
            continue
        }
        
        if(airport.innerText.split("(")[0].trim().toUpperCase().startsWith(event.target.value.toUpperCase()) || pos <= 5) {
            airport.style.display = "block";
            airport.style.transform = `translateY(${++pos}00%)`
            continue;
        }
        
        airport.style.display = "none" 
    }
});

for(let i = 0; i < Math.min(10, tickets.length); i++) tickets[i].style.display = "flex";

const allArrival = container[1].querySelectorAll(".airport-choice");
allArrival.forEach((airport) => {
    airport.addEventListener("click", (event) => {
        if(event.target.innerText.includes("(")) container[1].querySelector("input").value = event.target.innerText;
        else container[1].querySelector("input").value = event.target.parentNode.innerText;
        allArrival.forEach((airport) => {
            airport.style.display = "none";
        })  
    })
})

const allDeparture = container[0].querySelectorAll(".airport-choice");
allDeparture.forEach((airport) => {
    airport.addEventListener("click", (event) => {
        if(event.target.innerText.includes("(")) container[0].querySelector("input").value = event.target.innerText;
        else container[0].querySelector("input").value = event.target.parentNode.innerText;
        allDeparture.forEach((airport) => {
            airport.style.display = "none";
        })  
    })
})

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