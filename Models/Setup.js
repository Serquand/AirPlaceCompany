const client = require("./Client")
const Airport = require("./Airport")
const Flight = require("./Flight")
const Ticket = require("./Ticket")

// We sync all our models
module.exports = async () => {   
    await client.sync();
    await Airport.sync();
    await Flight.sync();
    await Ticket.sync();
}