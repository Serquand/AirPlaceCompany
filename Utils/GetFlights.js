const Flight = require("../Models/Flight")

module.exports = async () => {
    const flights = await Flight.findAll({
        attributes: []
    });
    
}