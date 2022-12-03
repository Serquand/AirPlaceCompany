const sequelize = require( "./Connection")
const DataTypes = require( "sequelize");

module.exports = sequelize.define("Airport", {
    idAirport: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },

    airportName: {
        type: DataTypes.STRING, 
        allowNull: false
    },

    cityName: {
        type: DataTypes.STRING(50), 
        allowNull: false
    }, 

    country: {
        type: DataTypes.STRING(50), 
        allowNull: false
    }, 

    langue: {
        type: DataTypes.STRING, 
        allowNull: false
    },

    numberTerminal: {
        type: DataTypes.INTEGER,
        allowNull: false
    }, 
}, {
    modelName: "Airport", 
    sequelize, 
    tableName: "Airports", 
    timestamps: false,  
})