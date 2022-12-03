const Sequelize = require('sequelize') 

module.exports = new Sequelize(process.env.DB_Name, process.env.DB_USER, process.env.DB_PASS, {
    host: process.env.DB_Host,
    dialect: process.env.DB_Dialect,
    logging: false
})