const Flight = require("../Models/Flight")
const Ticket = require("../Models/Ticket")
const Client = require("../Models/Client");
const Airport = require("../Models/Airport");
const getDate = require("../Utils/GetDate")

module.exports = async (email) => {
    const ticketArr = [], stateTickets = {}
    const client = (await Client.findOne({ 
        where: { email },
        attributes: ['idClient']
    }))?.dataValues.idClient;

    const tickets = await Ticket.findAll({
        where: { idClient: client },
        attributes: ['state', "seat", "idFlight", "idTicket"]
    });

    for (let ticket of tickets) {
        ticket = ticket.dataValues;

        const flight = (await Flight.findOne({ 
            where: { idFlight: ticket.idFlight },
            attributes: ['dateDeparture', "dateArrival", "availableSeat", "meal", "wifi", "idAirportDeparture", "idAirportArrival", "idFlight"]
        }))?.dataValues
        
        const airportDeparture = (await Airport.findOne({
            where: { idAirport: flight.idAirportDeparture }, 
            attributes: ["cityName", "discriminator"]
        }))?.dataValues
        
        const airportArrival = (await Airport.findOne({
            where: { idAirport: flight.idAirportArrival }, 
            attributes: ["cityName", "discriminator"]
        }))?.dataValues

        ticketArr.push({ ticket, flight, airportDeparture, airportArrival })
    }

    for (let i = 0; i < ticketArr.length; i++) {
        const state = ticketArr[i].ticket.state;
        
        const infoDate = getDate(ticketArr[i].flight.dateDeparture, ticketArr[i].flight.dateArrival)
        ticketArr[i].flight.hourDeparture = infoDate.hourDeparture;
        ticketArr[i].flight.hourArrival = infoDate.hourArrival;
        ticketArr[i].flight.date = infoDate.date;
        ticketArr[i].flight.travelTime = infoDate.travelTime;

        delete ticketArr[i].flight.dateDeparture 
        delete ticketArr[i].flight.dateArrival

        if(!stateTickets[state]) stateTickets[state] = [ticketArr[i]]
        else stateTickets[state].push(ticketArr[i])
    }
    return stateTickets
}