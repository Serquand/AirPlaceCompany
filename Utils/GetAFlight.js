const Flight = require("../Models/Flight")
const Airport = require("../Models/Airport");
const getDate = require("../Utils/GetDate")

// Get the information for a flight
module.exports = async (idFlight) => {
    // Get the different informations contains in the table Flights
    let flight = (await Flight.findOne({
        attributes: ["availableSeat", "price", "idFlight", "idAirportDeparture", "idAirportArrival", "dateDeparture", "dateArrival"], 
        where: { idFlight }
    }))?.dataValues;

    // Get the different information contains in the table Airports
    const airportDeparture = (await Airport.findOne({
        where: { idAirport: flight.idAirportDeparture }, 
        attributes: ["cityName", "discriminator"]
    }))?.dataValues
    
    const airportArrival = (await Airport.findOne({
        where: { idAirport: flight.idAirportArrival }, 
        attributes: ["cityName", "discriminator"]
    }))?.dataValues;
    
    // Create the flight object
    flight = { flight, airportDeparture, airportArrival }

    // Get the informations for the date, hour and duration of the travel
    const infoDate = getDate(flight.flight.dateDeparture, flight.flight.dateArrival)
    flight.flight.hourDeparture = infoDate.hourDeparture;
    flight.flight.hourArrival = infoDate.hourArrival;
    flight.flight.date = infoDate.date;
    flight.flight.travelTime = infoDate.travelTime;

    delete flight.flight.dateDeparture 
    delete flight.flight.dateArrival

    return flight
}