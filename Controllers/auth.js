const isAdminUtil = require("../Utils/isAdmin")
const jwt = require("jsonwebtoken")

// We check if the user is an admin
const isAdmin = async (req, res, next) => {
    // Create the auth type for the header bar
    const authType = {
        logged: req.session.user ? true : false, 
        admin: false
    }

    //Check if the user is logged in, in a first time extract the data, and then verify the json web token
    try {
        const token = req.session.token, email = req.session.user;
        const userId = jwt.verify(token, process.env.SALT_JWT).userId;
        const logged = !!(email && email == userId)
        
        // If we are not logged in, render the NotFound view
        if(!logged) return res.status(404).render("NotFound", { authType })
    } catch  {
        // If an error occured, render the NotFound view
        return res.status(404).render("NotFound", { authType })
    }
     
    // If the user is not an admin, render the NotFound view
    if(!await isAdminUtil(req.session.user)) return res.status(404).render("NotFound", { authType })

    // Go to the next middleware
    next();
}

// We check if an user is auth
const isAuth = (req, res, next) => {
    //Check if the user is logged in, in a first time extract the data, and then verify the json web token
    try {
        const token = req.session.token, email = req.session.user;
        const userId = jwt.verify(token, process.env.SALT_JWT).userId;
        const logged = !!(email && email == userId)
        
        // If we are logged in, go to the next middleware. Otherwise, redirect to the login page
        if(logged) return next()
        return res.status(301).redirect(process.env.URL + "login")
    } catch  {
        // If an error occured, redirect to the login page
        return res.status(301).redirect(process.env.URL + "login")
    }
}

module.exports = { isAdmin, isAuth }