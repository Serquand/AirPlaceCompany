const express = require('express');
const router = express.Router();
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const checkMail = require("../Utils/CheckMail");
const isAdmin = require('../Utils/isAdmin');
const Clients = require("../Models/Client");

// Route for sign in
router.post("/signin", async (req, res) => {   
    // Search in the database the information of the client
    const 
        user = { email: req.body.email, password: req.body.pwd }, 
        resDb = await Clients.findOne({ 
            where: { email: user.email }, 
            attributes: ["password", "name"] 
        });

    // If the information is not find or the password is incorrect, return an error
    if(!resDb || !bcrypt.compareSync(user.password, resDb.dataValues.password)) {
        return res.status(401).json({ information: "Wrong email or password" })
    }

    // Set the information in the session
    req.session.token = jwt.sign({ userId: user.email }, process.env.SALT_JWT, { expiresIn: '24h' })
    req.session.user = user.email
    req.session.admin = await isAdmin(user.email);

    // If we are missing some information of the client, return a 201 to inform that we've just create the account and we need more informations
    if(!resDb.dataValues.name) return res.status(201).json({ information: "Missing information" });

    return res.status(200).json({ information: "Successfully connected !" })    
})

// Route for register
router.post("/register", async (req, res) => {
    let email = req.body.email, password = req.body.pwd

    // If the email is invalid or the email is already used, return an error
    if(!checkMail(email)) return res.status(401).json({ information: "Unvalid email." })
    if(await Clients.count({ where: { email } })) return res.status(401).json({ information: "Email already used." })

    // Create the account with a password hashed
    const myHashPwd = await bcrypt.hash(password, 10)
    await Clients.create({ 
        email, 
        password: myHashPwd,  
        isAdmin: 0
    })

    // Set the session
    req.session.token = jwt.sign({ userId: email }, process.env.SALT_JWT, { expiresIn: '24h' })
    req.session.user = email
    req.session.admin = false

    return res.status(201).json({ information: "Successfully signed up !" })
})

// Add the different info
router.patch("/addInfo", (req, res) => {
    // If the informations are empty or are missing, return an error
    if(!req.body.name || req.body.name == "" || !req.body.lastName || req.body.lastName == "" || !req.body.phone || req.body.phone == "" || !req.body.birthday || req.body.birthday == "")
        return res.status(400).json({ information: "We are missing informatons" })

    // Update the table clients
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