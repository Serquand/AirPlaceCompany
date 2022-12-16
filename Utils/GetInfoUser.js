const Client = require("../Models/Client");

module.exports = async function (email) {
    // Get the info of the users and return them
    const info = (await Client.findOne({
        where: { email }, 
        attributes: ["name", "lastname", "email", "birthDate", "phoneNumber"]
    })).dataValues;

    return info;
}