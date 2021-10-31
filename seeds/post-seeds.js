// Post Seeds by Jack Loveday

// Import dependencies
const { Post } = require('../models');

const postArr = [
  {
    title: 'New Tech Blog',
    post_text: 'Here is my new Tech Blog! You can make posts and comment about tech, or other things I guess.',
    user_id: 1,
  },
  {
    title: 'Is there any correlation to weather and server connection?',
    post_text: 'Or is it just my internet?',
    user_id: 2,
  },
  {
    title: 'Do you prefer Handlebars or Bulma framework?',
    post_text: 'I have heard good things about Bulma but am unsure.',
    user_id: 3,
  }
]

const seedPosts = () => Post.bulkCreate(postArr);

module.exports = seedPosts;