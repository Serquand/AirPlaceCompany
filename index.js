require("dotenv").config()
const express = require('express');
const app = express();

const setup = require("./Models/Setup")

app.listen(process.env.WEB_PORT, () => {
    setup()
    console.clear()
    console.log("We are listening on port", process.env.WEB_PORT)
})