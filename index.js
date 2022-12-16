require("dotenv").config()
const express = require('express');
const app = express();
const cors = require("cors")
const cron = require("node-cron")
const session = require("express-session");
const path = require("path")

const setup = require("./Models/Setup")
const flightRoutes = require("./Controllers/flight.route")
const urserRoute = require("./Controllers/user.route")
const viewRoutes = require("./Controllers/view.route")
const getCurrentFlight = require("./Utils/UpdateStatusOfCurrent")

// Set the view engine and the folder
app.set('view engine', 'ejs');
app.set("views", path.join(__dirname, "views"));

// Classic middleware
app.use(cors("*"))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(express.static(path.join(__dirname, "public")))

// Middleware for sessions
app.use(session({
    secret: process.env.SESSION_SECRET, 
    resave: false, 
    saveUninitialized: false
}))

// Use the different routes
app.use("/flight", flightRoutes);
app.use("/user", urserRoute)
app.use("/", viewRoutes)

// Listening to the port, setup the database, clear the console and log the port
app.listen(process.env.WEB_PORT, () => {
    setup()
    console.clear()
    console.log("We are listening on port", process.env.WEB_PORT)
})

// Check the flights every single minutes
cron.schedule("* * * * *", async () => getCurrentFlight())