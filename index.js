require("dotenv").config()
const express = require('express');
const app = express();
const cors = require("cors")
const cron = require("node-cron")

const setup = require("./Models/Setup")
const flightRoutes = require("./Controllers/flight.route")
const urserRoute = require("./Controllers/flight.route")
const getCurrentFlight = require("./Utils/UpdateStatusOfCurrent")

app.use(cors("*"))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use("/flight", flightRoutes);
app.use("/user", urserRoute)

app.listen(process.env.WEB_PORT, () => {
    setup()
    console.clear()
    console.log("We are listening on port", process.env.WEB_PORT)
})

cron.schedule("* * * * *", async () => getCurrentFlight())