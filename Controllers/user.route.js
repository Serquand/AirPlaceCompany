const express = require('express');
const router = express.Router();
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const checkMail = require("../Utils/CheckMail");
const isAdmin = require('../Utils/isAdmin');
const Clients = require("../Models/Client");

router.post("/signin", async (req, res) => {   
    const 
        user = { email: req.body.email, password: req.body.pwd }, 
        resDb = await Clients.findOne({ 
            where: { email: user.email }, 
            attributes: ["password", "name"] 
        });

    if(!resDb || !bcrypt.compareSync(user.password, resDb.dataValues.password)) 
        return res.status(401).send({ error: "Wrong email or password" })

    req.session.token = jwt.sign({ userId: user.email }, process.env.SALT_JWT, { expiresIn: '24h' })
    req.session.user = user.email
    req.session.admin = await isAdmin(user.email);

    if(!resDb.dataValues.name) return res.status(201).send({ information: "Missing information" });

    return res.status(200).json({ information: "Successfully connected !" })    
})

router.post("/register", async (req, res) => {
    let email = req.body.email, password = req.body.pwd
    if(!checkMail(email)) return res.status(401).send({ message: "Unvalid email." })
    if(await Clients.count({ where: { email } })) return res.status(401).json({ error: "Email already used." })

    const myHashPwd = await bcrypt.hash(password, 10)
    await Clients.create({ 
        email, 
        password: myHashPwd,  
        isAdmin: 0
    })

    req.session.token = jwt.sign({ userId: email }, process.env.SALT_JWT, { expiresIn: '24h' })
    req.session.user = email
    req.session.admin = false
    return res.status(201).json({ information: "Successfully signed up !" })
})

router.patch("/addInfo", (req, res) => {
    if(!req.body.name || req.body.name == "" || !req.body.lastName || req.body.lastName == "" || !req.body.phone || req.body.phone == "" || !req.body.birthday || req.body.birthday == "")
        return res.status(400).json({ information: "We are missing informatons" })

    Clients.update({ 
        lastname: req.body.lastName,
        name: req.body.name,
        birthDate: req.body.birthDay,
        phoneNumber: req.body.phone
    }, {
        where: { email: req.session.user }
    });

    return res.status(200).json({ information: "Successfully updated !" })
})

module.exports = router;