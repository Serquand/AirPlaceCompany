const isAdminUtil = require("../Utils/isAdmin")
const jwt = require("jsonwebtoken")

const isAdmin = async (req, res, next) => {
    const authType = {
        logged: req.session.user ? true : false, 
        admin: false
    }

    try {
        const token = req.session.token, email = req.session.user;
        const userId = jwt.verify(token, process.env.SALT_JWT).userId;
        const logged = !!(email && email == userId)
        if(!logged) return res.status(404).render("NotFound", { authType })
    } catch  {
        return res.status(404).render("NotFound", { authType })
    }
    if(!await isAdminUtil(req.session.user)) return res.status(404).render("NotFound", { authType })
    next();
}

const isAuth = (req, res, next) => {
    try {
        const token = req.session.token, email = req.session.user;
        const userId = jwt.verify(token, process.env.SALT_JWT).userId;
        const logged = !!(email && email == userId)
        if(logged) return next()
        return res.status(301).redirect(process.env.URL + "login")
    } catch  {
        return res.status(301).redirect(process.env.URL + "login")
    }
}

module.exports = { isAdmin, isAuth }