const Airport = require("../Models/Airport");

module.exports = async () => {
    const airports = await Airport.findAll({ attributes: ["cityName", "discriminator"] });
    for (let i = 0; i < airports.length; i++) airports[i] = airports[i].dataValues;
    
    return airports;
}