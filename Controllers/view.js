const getInfoUser = require("../Utils/GetInfoUser")
const getFlightUser = require("../Utils/GetFlightUser")
const getAirports = require("../Utils/GetAirport")
const getFlights = require("../Utils/GetFlights")

const util = require("util");

const homeView = async (req, res) => {
    const authType = {
        logged: req.session.user ? true : false, 
        admin: req.session.admin ? true : false,
    }

    // List of the flights and the airports
    const airports = await getAirports()
    const flights = await getFlights();
    console.log(airports, flights);
    res.status(200).render("Home", { authType, airports, flights })
}

const adminView = async (req, res) => {
    const authType = {
        logged: true, 
        admin: true,
    }

    // List of the flights and the airports
    const airports = await getAirports()
    const flights = await getFlights();

    res.status(200).render("Admin", { authType, airports, flights })
}    

const loginView = (req, res) => {
    const authType = {
        logged: false, 
        admin: false,
    }

    res.status(200).render("Login", { authType })
}

const memberView = async (req, res) => {
    const authType = {
        logged: true, 
        admin: req.session.admin ? true : false,
    }
    
    const user = await getInfoUser(req.session.user)
    const flights = await getFlightUser(req.session.user);
    
    return res.status(200).render("Member", { authType, user, flights })
}

const notFoundView = (req, res) => {
    const authType = {
        logged: req.session.user ? false : true, 
        admin: req.session.admin ? false : true
    }

    res.status(200).render("NotFound", { authType })
}

module.exports = { homeView, adminView, loginView, memberView, notFoundView }