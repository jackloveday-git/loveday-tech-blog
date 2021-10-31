// ./models/User.js by Jack Loveday

// Import dependencies
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');
const { Model, DataTypes } = require('sequelize');


// User extends Sequelize Model
class User extends Model {
    // Method to check user password
    checkPassword(userPw) {
        return bcrypt.compareSync(userPw, this.password);
    }
}

// User config
User.init(
    {
        // User id
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        // User name
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        // Users email
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                // Check contents to make sure it is an email
                isEmail: true
            }
        },
        // User pw
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                // Minimum 4 characters in pw
                len: [4]
            }
        }
    },
    {
        // Setup sequelize hooks
        hooks: {
            async beforeCreate(loginData) {
                loginData.password = await bcrypt.hash(loginData.password, 10);
                return loginData;
            },
            async beforeUpdate(updatedData) {
                updatedData.password = await bcrypt.hash(updatedData.password, 10);
                return updatedData;
            }
        },
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'user'
    }
);

// Dont forget to export!
module.exports = User;