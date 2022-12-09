const Client = require("../Models/Client")

const isAdmin = async email => {
    const client = await Client.findOne({
        where: { email }, 
        attributes: ["isAdmin"]
    });

    return client.dataValues.isAdmin !== 0;
}

module.exports = isAdmin