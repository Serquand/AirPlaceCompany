const Flight = require("../Models/Flight")
const Airport = require("../Models/Airport");
const getDate = require("../Utils/GetDate")

module.exports = async () => {
    const flightsArr = [];

    // Find all the flights
    const flights = await Flight.findAll({
        attributes: ["availableSeat", "price", "idFlight", "idAirportDeparture", "idAirportArrival", "meal", "wifi", "dateDeparture", "dateArrival"], 
        where: { state: "Incoming" }
    });
    
    for (let flight of flights) {
        flight = flight.dataValues;

        // Get the different information contains in the table Airports
        const airportDeparture = (await Airport.findOne({
            where: { idAirport: flight.idAirportDeparture }, 
            attributes: ["cityName", "discriminator"]
        }))?.dataValues
        
        const airportArrival = (await Airport.findOne({
            where: { idAirport: flight.idAirportArrival }, 
            attributes: ["cityName", "discriminator"]
        }))?.dataValues;

        flightsArr.push({ flight, airportDeparture, airportArrival })
    }

    // Get the informations for the date, hour and duration of the travel
    for (let i = 0; i < flightsArr.length; i++) {
        const infoDate = getDate(flightsArr[i].flight.dateDeparture, flightsArr[i].flight.dateArrival)
        flightsArr[i].flight.hourDeparture = infoDate.hourDeparture;
        flightsArr[i].flight.hourArrival = infoDate.hourArrival;
        flightsArr[i].flight.date = infoDate.date;
        flightsArr[i].flight.travelTime = infoDate.travelTime;

        flightsArr[i].flight.dateDeparture 
        flightsArr[i].flight.dateArrival
    }

    // Sort by date 
    flightsArr.sort((a, b) => {
        return new Date(a.flight.dateDeparture) - new Date(b.flight.dateDeparture)
    })

    return flightsArr
}