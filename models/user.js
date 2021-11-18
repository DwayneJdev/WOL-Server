const { DataTypes } = require("sequelize");
const db = require("../db");

const User = db.define("user", {
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    // owner_id: {
    //     type: DataTypes.INTEGER,
    //     allowNull: false,
    //     unique: true
    // }
});

module.exports = User; 