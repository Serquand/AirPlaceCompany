const express = require('express');
const router = express.Router();

const { homeView, adminView, loginView, memberView, notFoundView } = require("./view")
const { isAuth, isAdmin } = require("./auth")

router.get("/", homeView);
router.get("/login", loginView);
router.get("/admin", isAuth, isAdmin, adminView);
router.get("/member", isAuth, memberView);
router.use(notFoundView);

module.exports = router;