// server.js by Jack Loveday

// Import dependencies
require('dotenv').config();
const express = require('express');
const handlebars = require('express-handlebars')
const session = require('express-session')
const cookieParser = require('cookie-parser')
const cookieSession = require('cookie-session')
const SequelizeStore = require('connect-session-sequelize')(session.Store);

// Connect folders/helpers
const helpers = require('./utils/helpers');
const path = require('path');
const routes = require('./controllers/');
const sequelize = require('./config/connection');


// Start our server and port
const app = express();
const PORT = process.env.PORT || 3001;

// Init our Session/Cookie
const userSession = {
    secret: "bootcamp",
    cookie: {
        // Add a timer
        maxAge: 7200000
    },
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize
    })
};

// Init our Handlebars Helpers
const expHandlebars = handlebars.create({ helpers });

// Setup Middleware and app
app.set('view engine', 'handlebars');
app.engine('handlebars', expHandlebars.engine);
app.use(express.static(path.join(__dirname, 'public')));
app.use(session(userSession));
app.use(express.json());
app.use(require("./controllers/"));
app.use(express.urlencoded({ extended: false }));
app.use(routes);

// Start connection with sequelize
sequelize.sync({
    // No force to maintain normal operations
    force: false
}).then(() => {
    app.listen(PORT, () => console.log(`Listening on Port: ${PORT}`));
});