const Flight = require("../Models/Flight")
const Airport = require("../Models/Airport");
const getDate = require("../Utils/GetDate")

module.exports = async () => {
    const flightsArr = [];

    const flights = await Flight.findAll({
        attributes: ["availableSeat", "price", "idFlight", "idAirportDeparture", "idAirportArrival", "meal", "wifi", "dateDeparture", "dateArrival"], 
        where: { state: "Incoming" }
    });
    
    for (let flight of flights) {
        flight = flight.dataValues;
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

    for (let i = 0; i < flightsArr.length; i++) {
        const infoDate = getDate(flightsArr[i].flight.dateDeparture, flightsArr[i].flight.dateArrival)
        flightsArr[i].flight.hourDeparture = infoDate.hourDeparture;
        flightsArr[i].flight.hourArrival = infoDate.hourArrival;
        flightsArr[i].flight.date = infoDate.date;
        flightsArr[i].flight.travelTime = infoDate.travelTime;

        flightsArr[i].flight.dateDeparture 
        flightsArr[i].flight.dateArrival
    }

    flightsArr.sort((a, b) => {
        return new Date(a.flight.dateDeparture) - new Date(b.flight.dateDeparture)
    })

    return flightsArr
}