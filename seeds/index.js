// Seeding Index by Jack Loveday

// Import dependencies
const sequelize = require('../config/connection');
const seedUsers = require('./user-seeds');
const seedPosts = require('./post-seeds');
const seedComments = require('./comment-seeds');

// Seed all data
const seedAll = async() => {
    await sequelize.sync({ force: true });
    console.log('\nDATABASE SYNCED\n');
    await seedUsers();
    console.log('\nUSERS SEEDED\n');

    await seedPosts();
    console.log('\nPOSTS SEEDED\n');

    await seedComments();
    console.log('\nCOMMENTS SEEDED\n');

    process.exit(0);
};

// Call the function
seedAll();