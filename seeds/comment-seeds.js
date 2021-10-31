// Comment Seeds by Jack Loveday

// Import dependencies
const { Comment } = require('../models');

// Init Comment seeds
const commentArr = [
    {
        comment_text: "First",
        post_id: 1,
        user_id: 2
    },
    {
        comment_text: "My Post was first!",
        post_id: 1,
        user_id: 1
    },
    {
        comment_text: "It is raining hard here",
        post_id: 2,
        user_id: 3
    },
    {
        comment_text: "I really prefer handlebars, personally!",
        post_id: 3,
        user_id: 2
    }
];

const seedComments = () => Comment.bulkCreate(commentArr);
module.exports = seedComments;