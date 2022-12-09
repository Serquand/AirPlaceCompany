const sequelize = require( "./Connection")
const DataTypes = require( "sequelize");

module.exports = sequelize.define("Client", {
    idClient: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },

    name: {
        type: DataTypes.STRING, 
    },

    lastname: {
        type: DataTypes.STRING, 
    }, 

    email: {
        type: DataTypes.STRING, 
        allowNull: false
    },

    password: {
        type: DataTypes.STRING, 
        allowNull: false,
    },

    isAdmin: {
        type: DataTypes.INTEGER
    },

    birthDate: {
        type: DataTypes.STRING, 
    }, 

    phoneNumber: {
        type: DataTypes.STRING, 
    }
}, {
    modelName: "Client", 
    sequelize, 
    tableName: "Clients", 
    timestamps: false,  
})