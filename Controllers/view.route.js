const express = require('express');
const router = express.Router();

const { homeView, adminView, loginView, memberView } = require("./view")

router.get("/", homeView);
router.get("/login", loginView);
router.get("/admin", adminView);
router.get("/member", memberView);

module.exports = router;