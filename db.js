const Sequelize = require('Sequelize');

const sequelize = new Sequelize("postgres://postgres:Eleven$erver!@localhost:5432/workout-log");

module.exports = sequelize;