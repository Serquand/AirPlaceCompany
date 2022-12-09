const homeView = (req, res) => {
        const authType = {
        logged: req.session.user ? true : false, 
        admin: req.session.admin ? true : false,
    }
    res.status(200).render("Home", { authType })
}

const adminView = (req, res) => {
        const authType = {
        logged: req.session.user ? true : false, 
        admin: req.session.admin ? true : false,
    }
    res.status(200).render("Admin", { authType })
}    

const loginView = (req, res) => {
    const authType = {
        logged: req.session.user ? true : false, 
        admin: req.session.admin ? true : false,
    }
    res.status(200).render("Login", { authType })
}

const memberView = (req, res) => {
        const authType = {
        logged: req.session.user ? true : false, 
        admin: req.session.admin ? true : false,
    }
    res.status(200).render("Member", { authType })
}

const notFoundView = (req, res) => {
    const authType = {
        logged: req.session.user ? false : true, 
        admin: req.session.admin ? false : true
    }
    res.status(200).render("NotFound", { authType })
}

module.exports = { homeView, adminView, loginView, memberView, notFoundView }