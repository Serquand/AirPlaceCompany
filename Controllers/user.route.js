const express = require('express');
const router = express.Router();
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const checkMail = require("../Utils/CheckMail");
const isAdmin = require('../Utils/isAdmin');
const Clients = require("../Models/Client");

router.post("/signin", async (req, res) => {   
    const user = { email: req.body.email, password: req.body.pwd }, resDb = await Clients.findOne({ where: { email: user.email} }) 
    if(!resDb || !bcrypt.compareSync(user.password, resDb.dataValues.password)) return res.status(401).send({ error: "Wrong email or password" })

    req.session.token = jwt.sign({ userId: user.email }, process.env.SALT_JWT, { expiresIn: '24h' })
    req.session.user = user.email
    req.session.admin = await isAdmin(user.email)
    return res.status(200).json({ information: "Successfully connected !" })    
})

router.post("/register", async (req, res) => {
    let email = req.body.email, password = req.body.pwd
    if(!checkMail(email)) return res.status(401).send({ message: "Unvalid email." })
    if(await Clients.count({ where: { email } })) return res.status(401).json({ error: "Email already used." })

    const myHashPwd = await bcrypt.hash(password, 10)
    await Clients.create({ email: email, password: myHashPwd })

    req.session.token = jwt.sign({ userId: email }, process.env.SALT_JWT, { expiresIn: '24h' })
    req.session.user = email
    req.session.admin = false
    return res.status(201).json({ information: "Successfully signed up !" })
})

router.patch("/addInfo", (req, res) => {

})

module.exports = router;