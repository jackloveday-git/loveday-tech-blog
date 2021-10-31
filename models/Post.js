// ./models/Post.js by Jack Loveday

// Import dependencies
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// Post extends the Sequelize Model
class Post extends Model { }

// Post config
Post.init(
    {
        // Post id
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        // Post Name/Title
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        // Post Content/Text
        post_text: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        // Owner/User id
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'id'
            }
        }
    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'post'
    }
)

module.exports = Post;