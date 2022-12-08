const path = require("path");

const homeView = (req, res) => res.render("Home")

const adminView = (req, res) => res.render("Admin")

const loginView = (req, res) => res.render("Login")

const memberView = (req, res) => res.render("Member")

module.exports = { homeView, adminView, loginView, memberView }