// ./config/connection.js by Jack Loveday

// Import dependencies
const Sequelize = require('sequelize');
require('dotenv').config();

// Global init
let sequelize;

// Connect to 3001 using .env logins
if (process.env.JAWSDB_URL) {
    sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {
    sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PW, {
        host: 'localhost',
        dialect: 'mysql',
        port: process.env.PORT
    });
}

module.exports = sequelize;