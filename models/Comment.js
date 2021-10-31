// ./models/Comment.js Model by Jack Loveday

// Import dependencies
const sequelize = require('../config/connection');
const { Model, DataTypes } = require('sequelize');


// Comment extends the Sequelize Model 
class Comment extends Model { }

// Comment config
Comment.init(
    {
        // Comment id
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        // Comment content/text
        comment_text: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        // Owner/Poster id
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'id'
            }
        },
        // Parent (Post) id
        post_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'post',
                key: 'id'
            }
        }
    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'comment'
    }
)

module.exports = Comment;