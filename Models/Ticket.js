const sequelize = require( "./Connection")
const DataTypes = require( "sequelize");
const Client = require("./Client")
const Flight = require("./Flight");

module.exports = sequelize.define("Ticket", {
    idTicket: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    
    price: {
        type: DataTypes.INTEGER,
        allowNull: false
    }, 

    state: {
        type: DataTypes.STRING, 
        allowNull: false
    }, 

    numberLuggage: {
        type: DataTypes.INTEGER, 
        allowNull: false
    }, 

    datePurchase: {
        type: DataTypes.DATE,
        allowNull: false
    }, 

    seat: {
        type: DataTypes.INTEGER,
        allowNull: false
    }, 

    idFlight: {
        type: DataTypes.INTEGER,
        references: {
            model: Flight, 
            key: "idFlight"
        }
    }, 

    idClient: {
        type: DataTypes.INTEGER,
        references: {
            model: Client, 
            key: "idClient"
        }
    }
}, {
    modelName: "Ticket", 
    sequelize, 
    tableName: "Tickets", 
    timestamps: false, 
})