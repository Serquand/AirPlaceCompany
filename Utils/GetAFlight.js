const Flight = require("../Models/Flight")
const Airport = require("../Models/Airport");
const getDate = require("../Utils/GetDate")

module.exports = async (idFlight) => {
    let flight = (await Flight.findOne({
        attributes: ["availableSeat", "idFlight", "idAirportDeparture", "idAirportArrival", "dateDeparture", "dateArrival"], 
        where: { idFlight }
    }))?.dataValues;
    
    console.log(idFlight);

    const airportDeparture = (await Airport.findOne({
        where: { idAirport: flight.idAirportDeparture }, 
        attributes: ["cityName", "discriminator"]
    }))?.dataValues
    
    const airportArrival = (await Airport.findOne({
        where: { idAirport: flight.idAirportArrival }, 
        attributes: ["cityName", "discriminator"]
    }))?.dataValues;
    
    flight = { flight, airportDeparture, airportArrival }

    const infoDate = getDate(flight.flight.dateDeparture, flight.flight.dateArrival)
    flight.flight.hourDeparture = infoDate.hourDeparture;
    flight.flight.hourArrival = infoDate.hourArrival;
    flight.flight.date = infoDate.date;
    flight.flight.travelTime = infoDate.travelTime;

    delete flight.flight.dateDeparture 
    delete flight.flight.dateArrival

    return flight
}