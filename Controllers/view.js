const getInfoUser = require("../Utils/GetInfoUser")
const getFlightUser = require("../Utils/GetFlightUser")
const util = require("util");

const homeView = (req, res) => {
    const authType = {
        logged: req.session.user ? true : false, 
        admin: req.session.admin ? true : false,
    }

    // List of the flights


    res.status(200).render("Home", { authType })
}

const adminView = (req, res) => {
    const authType = {
        logged: true, 
        admin: true,
    }

    // List of the flights
    res.status(200).render("Admin", { authType })
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
    console.log(util.inspect({ authType, user, flights }, false, null, true));
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