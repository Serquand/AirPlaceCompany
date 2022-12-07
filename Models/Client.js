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
        allowNull: false
    },

    lastname: {
        type: DataTypes.STRING, 
        allowNull: false
    }, 

    email: {
        type: DataTypes.STRING, 
        allowNull: false
    },

    password: {
        type: DataTypes.STRING, 
        allowNull: false,
    },

    birthDate: {
        type: DataTypes.STRING, 
        allowNull: false
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