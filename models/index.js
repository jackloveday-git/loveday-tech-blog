// ./models/index.js by Jack Loveday

// Import models
const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');

// User to Post relationships
User.hasMany(Post, { foreignKey: 'user_id' });
Post.belongsTo(User, { foreignKey: 'user_id' });

// Comments belong to one user and one post
Comment.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'cascade',
    hooks: true
});

Comment.belongsTo(Post, {
    foreignKey: 'post_id',
    onDelete: 'cascade',
    hooks: true
});

// Comment ownership relationships 
Post.hasMany(Comment, {
    foreignKey: 'post_id',
    onDelete: 'cascade',
    hooks: true
});

User.hasMany(Comment, {
    foreignKey: 'user_id',
    onDelete: 'cascade',
    hooks: true
});

module.exports = { User, Post, Comment };