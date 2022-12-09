const isAdminUtil = require("../Utils/isAdmin")
const jwt = require("jsonwebtoken")

const isAdmin = (req, res, next) => {
    if(!isAdminUtil(req.session.user)) return res.status(401).json({ information: "Access denied." });
    next();
}

const isAuth = (req, res, next) => {
    try {
        const token = req.session.token, email = req.session.user;
        const userId = jwt.verify(token, process.env.SALT_JWT).userId;
        const logged = !!(email && email == userId)
        if(logged) return next()
        res.status(401).json({ information: "Unsuccessfully logged in !" });   
    } catch  {
        res.status(401).json({ information: "Unsuccessfully logged in !" });
    }

}

module.exports = { isAdmin, isAuth }