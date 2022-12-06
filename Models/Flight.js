const sequelize = require( "./Connection")
const DataTypes = require( "sequelize");
const Airport = require("./Airport")

module.exports = sequelize.define("Flight", {
    idFlight: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    }, 

    price: {
        type: DataTypes.INTEGER,
        allowNull: false
    }, 

    dateDeparture: {
        type: DataTypes.STRING,
        allowNull: false
    }, 

    dateArrival: {
        type: DataTypes.STRING,
        allowNull: false
    }, 

    availableSeat: {
        type: DataTypes.INTEGER,
        allowNull: false
    }, 

    meal: {
        type: DataTypes.INTEGER,
    }, 

    wifi: {
        type: DataTypes.INTEGER
    },

    state: {
        type: DataTypes.STRING,
    },

    idAirportDeparture: {
        type: DataTypes.INTEGER,
        references: {
            model: Airport,
            key: "idAirport"
        }
    }, 

    idAirportArrival: {
        type: DataTypes.INTEGER,
        references: {
            model: Airport,
            key: "idAirport"
        }
    }
}, {
    modelName: "Flight", 
    sequelize, 
    tableName: "Flights", 
    timestamps: false, 
});