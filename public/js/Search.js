const container = document.querySelectorAll(".booking-form-component");

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
        
        if(airport.innerText.split("(")[0].trim().toUpperCase().startsWith(event.target.value.toUpperCase())) {
            airport.style.display = "block";
            airport.style.transform = `translateY(${++pos}00%)`
            continue;
        }
        
        airport.style.display = "none" 
    }
});

const allArrival = container[1].querySelectorAll(".airport-choice");
allArrival.forEach((airport) => {
    airport.addEventListener("click", (event) => {
        container[1].querySelector("input").value = event.target.innerText;
        allArrival.forEach((airport) => {
            airport.style.display = "none";
        })  
    })
})

const allDeparture = container[0].querySelectorAll(".airport-choice");
allDeparture.forEach((airport) => {
    airport.addEventListener("click", (event) => {
        container[0].querySelector("input").value = event.target.innerText;
        allDeparture.forEach((airport) => {
            airport.style.display = "none";
        })  
    })
})

document.querySelector("#button-search-flight").addEventListener("click", (event) => {
    
});