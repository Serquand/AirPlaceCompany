const sequelize = require( "./Connection")
const DataTypes = require( "sequelize");

// We use Sequelize to create our table Airports
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

    discriminator: {
        type: DataTypes.STRING(3), 
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