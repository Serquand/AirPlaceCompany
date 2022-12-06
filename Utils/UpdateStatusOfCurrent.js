const Flight = require("../Models/Flight")
const Op = require("sequelize").Op
const Ticket = require("../Models/Ticket");

const createCurrentStringDate = () => {
    const date = new Date(), 
    day = date.getDate().toString().padStart(2, '0'),  
    year = date.getFullYear(), 
    month = (date.getMonth() + 1).toString().padStart(2, '0'),
    hour = date.getHours().toString().padStart(2, '0'),
    minutes = date.getMinutes().toString().padStart(2, '0');

    return `${year}-${month}-${day}T${hour}:${minutes}:00.000Z`;
}

const fetchFlights = async () => {
    return await Flight.findAll({
        where: {
            dateDeparture: createCurrentStringDate()
        }
    })
}

const generateCondition = data => {
    const arr = [];
    for (const d of data) arr.push({ idFlight: d.dataValues.idFlight })
    
    return arr;
}

module.exports = async () => {
    const flights = await fetchFlights()
    if(flights.length === 0) return;
    
    const condition = generateCondition(flights)

    await Flight.update({ state: "Done" }, { where: {[Op.or]: condition }})
    await Ticket.update({ state: "Done" }, { where: {[Op.or]: condition } }) 
}