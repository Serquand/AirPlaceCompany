const express = require('express');
const router = express.Router();
const Flight = require('../Models/Flight');
const Ticket = require("../Models/Ticket")
const Airport = require("../Models/Airport")
const sequelize = require("../Models/Connection")

// We are gonna to create a new flight
router.post("/createFlight", async (req, res) => {
    if(req.body.price < 0) return res.status(400).json({ information: "The price cannot be lower than 0" })
    if(req.body.seat < 0) return res.status(400).json({ information: "The number of available seat cannot be lower than 0" })
    if(req.body.airportArrival === req.body.airportDeparture) return res.status(401).json({ information: "The airport arrival and the airport departure cannot be the same" })

    await Flight.create({
        price: req.body.price, 
        meal: req.body.meal, 
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
router.patch("/cancelFlight/:idFlight", async (req, res) => {
    if(!req.params.idFlight) return res.status(400).json({ information: "Invalid request !" })

    Flight.update({ state: "Cancelled" }, { where: { idFlight: req.params.idFlight } })
    Ticket.update({ state: "Cancelled" }, { where: { idFlight: req.params.idFlight } })
    
    return res.status(200).json({ information: "Successfuly cancelled !" })
})

//Ticket bought 
router.post("/bought", async (req, res) => {
    // If the flight is full, or the flight is not exist, return error
    const flight = (await Flight.findOne({ 
        where: { idFlight: req.body.flight }, 
        attributes: ["price", "availableSeat"] 
    }))?.dataValues

    if(flight == undefined) return res.status(404).json({ information: "This flight doesn't exist" })
    if(!flight.availableSeat) return res.status(401).json({ information: "This flight is already full" })
    console.log(flight);

    for(let i = 0; i < req.body.numberTicket; i++) {
        // Create the ticket 
        Ticket.create({
            price: flight.price, 
            state: "Incoming", 
            numberLuggage: req.body.numberLuggage, 
            datePurchase: new Date(), 
            seat: flight.availableSeat - i, 
            idFlight: req.body.flight, 
            idClient: req.body.idClient
        })

        // Decrement the number of free seats 
        Flight.increment({ availableSeat: -1 }, { where: { idFlight: req.body.flight } })
    }

    return res.status(201).json({ information: "Succesfully purchased" })
})

// Make a list of all the flights 
router.get("/list", async (req, res) => {})

// Get the info of a flight for an admin 
router.get("/info/:idFlight", async (req, res) => {
    if(!req.params.idFlight) return res.status(401).json({ information: "Invalid erquest" });

    // Get basis information on the flight
    const flight = (await Flight.findOne({ where: { idFlight: req.params.idFlight } }))?.dataValues
    if(flight == undefined) return res.status(404).json({ information: "Failed to find the flight" });

    // Get the different airport
    flight.arrival = (await Airport.findOne({ 
        where: { idAirport: flight.idAirportArrival }, 
        attributes: ["airportName", "cityName", "country"] 
    }))?.dataValues
    delete flight.idAirportArrival;

    flight.departure = (await Airport.findOne({ 
        where: { idAirport: flight.idAirportDeparture }, 
        attributes: ["airportName", "cityName", "country"] 
    }))?.dataValues
    delete flight.idAirportDeparture

    // Get the client of the flight
    const [results] = await sequelize.query(`
        SELECT * FROM Clients, Tickets 
        WHERE Tickets.idFlight = ${req.params.idFlight}
        AND Tickets.idClient = Clients.idClient;
    `);
    flight.clients = results

    return res.status(200).json({ flight })
})

// Get the info of our flights
router.get("/ourFlights", async (req, res) => {})

// We are gonna to update a flight price
router.put("/:idFlight", async (req, res) => {
    // Check if the params idFlight and the price is correct are correct
    if(!req.params.idFlight || !req.body.price) return res.status(401).json({ information: "Invalid request !" })

    // Check the status of the flight
    const flight = (await Flight.findOne({ 
        where: { idFlight: req.params.idFlight }, 
        attributes: ["state", "price"]
    }))?.dataValues;
        
    if(flight == undefined) return res.status(400).json({ information: "Failed to find the flight" });
    if(flight.price == req.body.price) return res.status(400).json({ information: "Older and newer price are the same" });
    if(flight.state != "Incoming") return res.status(400).json({ information: "The flight has been already taking place or is cancelled" });

    // Update the price of the flight
    Flight.update({ price: req.body.price }, { where: { idFlight: req.params.idFlight }})

    return res.status(200).json({ information: "Price successfully updated" })
})

// We are gonna to cancel a ticket
router.patch("/cancelTicket/:idTicket", async (req, res) => {
    if(!req.params.idTicket) return res.status(400).json({ information: "Invalid request !" })

    // Get the ticket 
    const ticket = (await Ticket.findOne({
        where: { idTicket: req.params.idTicket }, 
        attributes: ["state", "idFlight"]
    }))?.dataValues;

    if(ticket === undefined) return res.status(404).json({ information: "Ticket not found" })
    if(ticket.state != "Incoming") return res.status(404).json({ information: "The flight has been already taking place or is already cancelled" });

    // Increment the number of free seats
    Flight.increment({ availableSeat: 1 }, { where: { idFlight: ticket.idFlight } })

    // Change the status 
    Ticket.update({ state: "Cancelled" }, { where: { idTicket: req.params.idTicket }})

    return res.status(200).json({ information: "Successfuly cancelled !" })
})

module.exports = router;