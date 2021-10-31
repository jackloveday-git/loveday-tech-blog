// User Seeds by Jack Loveday

// Import dependencies
const { User } = require('../models');

// Config User Seeds
const userArr = [
  {
    username: "Admin",
    email: "admin@techblog.com",
    password: "admin"
  },
  {
    username: "webDev4564564",
    email: "jumanjidev1322@gmail.com",
    password: "123456"
  },
  {
    username: "techGuru",
    email: "steve_guru@opin.com",
    password: "newpassword"
  }
];

const seedUsers = () => User.bulkCreate(userArr);
module.exports = seedUsers;