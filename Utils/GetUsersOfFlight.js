const sequelize = require("../Models/Connection")

module.exports = async (idFlight) => {
    // Get the customers of a flight and return them
    const usersList = await sequelize.query(`
        SELECT name, lastname 
        FROM Clients c, Tickets t 
        WHERE t.idFlight = ${idFlight} 
        AND t.idClient = c.idClient
        AND t.state = 'Incoming';
    `);

    return usersList[0];
}