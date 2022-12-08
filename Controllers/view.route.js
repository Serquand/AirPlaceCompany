const express = require('express');
const router = express.Router();

const { homeView } = require("./view")

router.get("/", homeView)

module.exports = router;