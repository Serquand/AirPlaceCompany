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
        logged: req.session.user ? true : false, 
        admin: req.session.admin ? true : false,
    }

    res.status(404).render("NotFound", { authType })
}

const logOut = (req, res) => {  
    req.session.token = ""
    req.session.user = ""
    req.session.admin = false

    res.redirect(process.env.URL)
}

module.exports = { homeView, adminView, loginView, memberView, notFoundView, logOut }