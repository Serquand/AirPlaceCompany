const homeView = (req, res) => res.status(200).render("Home")
const adminView = (req, res) => res.status(200).render("Admin")
const loginView = (req, res) => res.status(200).render("Login")
const memberView = (req, res) => res.status(200).render("Member")
const notFoundView = (req, res) => res.status(200).render("NotFound")

module.exports = { homeView, adminView, loginView, memberView, notFoundView }