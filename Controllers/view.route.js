const express = require('express');
const router = express.Router();

const { homeView, adminView, loginView, memberView, notFoundView, logOut } = require("./view")
const { isAuth, isAdmin } = require("./auth")

router.get("/", homeView);
router.get("/login", loginView);
router.get("/admin", isAdmin, adminView);
router.get("/member", isAuth, memberView);
router.get("/logout", isAuth, logOut)
router.use(notFoundView);

module.exports = router;