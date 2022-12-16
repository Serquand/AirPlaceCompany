const Client = require("../Models/Client")

// Return a boolean indicating if the client is an admin or not
const isAdmin = async email => {
    const client = await Client.findOne({
        where: { email }, 
        attributes: ["isAdmin"]
    });

    return client.dataValues.isAdmin !== 0;
}

module.exports = isAdmin