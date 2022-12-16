const express = require('express');
const router = express.Router();
const Flight = require('../Models/Flight');
const Ticket = require("../Models/Ticket")
const Client = require("../Models/Client")
const Airport = require("../Models/Airport");
const { isAuth, isAdmin } = require("./auth");
const goodAirport = require("../Utils/GoodAirport")
const convertDate = require("../Utils/ConvertDate")

// We will add the id of a client
const addClientId = async (req, res, next) => {
    // We search for the id of the client in the database
    const clientId = (await Client.findOne({
        where: { email: req.session.user }, 
        attributes: ["idClient"]
    }))?.idClient;

    // We update the req.body to add the clientId
    req.body.idClient = clientId;
    next();
}

const matchingAirport = async (req, res, next) => {
    // If the format of the airport is not good, return an error
    if(!goodAirport(req.body.airportDeparture) || !goodAirport(req.body.airportArrival)) {
        return res.status(400).json({ information: "Airports are wrong !" });
    }

    //Search in the database the departure and the arrival airport
    req.body.airportDeparture = (await Airport.findOne({
        where: { discriminator: req.body.airportDeparture.split("(")[1].split(")")[0] }, 
        attributes: ["idAirport"]
    }))?.dataValues.idAirport;

    req.body.airportArrival = (await Airport.findOne({
        where: { discriminator: req.body.airportArrival.split("(")[1].split(")")[0] }, 
        attributes: ["idAirport"]
    }))?.dataValues.idAirport;

    // If we cannot find the airport, return an error
    if(req.body.airportDeparture == undefined || req.body.airportArrival == undefined) {
        return res.status(400).information({ information: "Airport not found !" })
    }

    // If the airport are the same, return an error
    if(req.body.airportArrival === req.body.airportDeparture) {
        return res.status(400).json({ information: "The airport arrival and the airport departure cannot be the same" })
    }

    next();
}

// We will create the string of the date
const createDateTime = (req, res, next) => {
    req.body.dateDeparture = convertDate(req.body.dateDeparture, req.body.timeDeparture)
    req.body.dateArrival = convertDate(req.body.dateArrival, req.body.timeArrival)

    if(!req.body.dateDeparture || !req.body.dateArrival) return res.status(400).json({ information: "Invalid date" })
    
    const timeArrival = new Date(req.body.dateArrival).getTime(), timeDeparture = new Date(req.body.dateDeparture).getTime()
    if(timeArrival < timeDeparture) return res.status(400).json({ information: "Invalid date" })

    if(timeDeparture < Date.now()) return res.status(400).json({ information: "You cannot create a flight with a past date" })

    next()
}


// We are gonna to create a new flight
router.post("/createFlight", isAdmin, matchingAirport, createDateTime, async (req, res) => {
    // If the price is missing or is lower than 0, return an error
    if(!req.body.price || req.body.price < 0) {
        return res.status(400).json({ information: "The price cannot be lower than 0" })
    } 

    // If the number of available seat is missing or is lower than 0, return an error
    if(!req.body.seat || req.body.seat < 0) {
        return res.status(400).json({ information: "The number of available seat cannot be lower than 0" })
    }

    // Add the flight in the database
    await Flight.create({
        price: req.body.price,
        meal: req.body.meal ? 1 : 0, 
        wifi: req.body.wifi ? 1 : 0,
        state: "Incoming", 
        idAirportDeparture: req.body.airportDeparture,
        idAirportArrival: req.body.airportArrival, 
        availableSeat: req.body.seat, 
        dateDeparture: req.body.dateDeparture, 
        dateArrival: req.body.dateArrival
    });

    res.status(201).json({ information: "Successfully created" })
})

// We are gonna to cancel a flight
router.patch("/cancelFlight/:idFlight", isAdmin, async (req, res) => {
    // If the id is missing, return an error
    if(!req.params.idFlight) return res.status(400).json({ information: "Invalid request !" })

    // Cancel the flight and then all tickets of the flight
    Flight.update({ state: "Cancelled" }, { where: { idFlight: req.params.idFlight } })
    Ticket.update({ state: "Cancelled" }, { where: { idFlight: req.params.idFlight } })
    
    return res.status(200).json({ information: "Successfuly cancelled !" })
})

//Ticket bought 
router.post("/bought", isAuth, addClientId, async (req, res) => {
    // If the flight is full, or the flight is not exist, return error
    const flight = (await Flight.findOne({ 
        where: { idFlight: req.body.flight }, 
        attributes: ["price", "availableSeat"] 
    }))?.dataValues

    if(flight == undefined) return res.status(404).json({ information: "This flight doesn't exist" })
    if(!flight.availableSeat) return res.status(400).json({ information: "This flight is already full" })

    for(let i = 0; i < req.body.numberTicket; i++) {
        // Create the ticket 
        Ticket.create({
            price: flight.price, 
            state: "Incoming", 
            numberLuggage: 1, 
            datePurchase: new Date().toString(), 
            seat: flight.availableSeat - i, 
            idFlight: req.body.flight, 
            idClient: req.body.idClient
        })

        // Decrement the number of free seats 
        Flight.increment({ availableSeat: -1 }, { where: { idFlight: req.body.flight } })
    }

    return res.status(201).json({ information: "Succesfully purchased" })
})


// We are gonna to update a flight price
router.put("/:idFlight", isAdmin, async (req, res) => {
    // Check if the params idFlight and the price is correct are correct
    if(!req.params.idFlight || !req.body.price || req.body.price == "" || !typeof(req.body.price) == "number") 
        return res.status(400).json({ information: "Invalid request !" })

    // Check the status of the flight
    const flight = (await Flight.findOne({ 
        where: { idFlight: req.params.idFlight }, 
        attributes: ["state", "price"]
    }))?.dataValues;
        
    // If the flight doesn't exist, or the new price is equal to the older price, or the state is cancel or past, return an error
    if(flight == undefined) return res.status(400).json({ information: "Failed to find the flight" });
    if(flight.price == req.body.price) return res.status(400).json({ information: "Older and newer price are the same" });
    if(flight.state != "Incoming") return res.status(400).json({ information: "The flight has been already taking place or is cancelled" });

    // Update the price of the flight
    Flight.update({ price: req.body.price }, { where: { idFlight: req.params.idFlight }})

    return res.status(200).json({ information: "Price successfully updated" })
})

// We are gonna to cancel a ticket
router.patch("/cancelTicket/:idTicket", isAuth, async (req, res) => {
    if(!req.params.idTicket) return res.status(400).json({ information: "Invalid request !" })

    // Get the ticket 
    const ticket = (await Ticket.findOne({
        where: { idTicket: req.params.idTicket }, 
        attributes: ["state", "idFlight"]
    }))?.dataValues;

    // If the ticket doesn't exist or the state is cancel or past, return an error
    if(ticket === undefined) return res.status(404).json({ information: "Ticket not found" })
    if(ticket.state != "Incoming") return res.status(404).json({ information: "The flight has been already taking place or is already cancelled" });

    // Increment the number of free seats
    Flight.increment({ availableSeat: 1 }, { where: { idFlight: ticket.idFlight } })

    // Change the status 
    Ticket.update({ state: "Cancelled" }, { where: { idTicket: req.params.idTicket }})

    return res.status(200).json({ information: "Successfuly cancelled !" })
})

module.exports = router;