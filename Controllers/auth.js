const isAdminUtil = require("../Utils/isAdmin")
const jwt = require("jsonwebtoken")

const isAdmin = async (req, res, next) => {
    if(!await isAdminUtil(req.session.user)) return res.status(200).render("NotFound")
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