const { DataTypes } = require("sequelize");
const db = require("../db");

const LogModel = db.define("log", {
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    definition: {
        type: DataTypes.STRING,
        allowNull: false
    },
    results: {
        type: DataTypes.STRING,
        allowNull: false
    },
    owner_id: {
        type: DataTypes.INTEGER,
        allowNull: false
        
    }
 
});

module.exports = LogModel;