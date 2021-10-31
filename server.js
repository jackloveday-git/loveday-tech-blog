// // server.js by Jack Loveday

// // Import dependencies
// require('dotenv').config();
// const express = require('express');
// const handlebars = require('express-handlebars')
// const session = require('express-session')
// const cookieParser = require('cookie-parser')
// const cookieSession = require('cookie-session')
// const SequelizeStore = require('connect-session-sequelize')(session.Store);

// // Connect folders/helpers
// const helpers = require('./utils/helpers');
// const path = require('path');
// const routes = require('./controllers/');
// const sequelize = require('./config/connection');


// // Start our server and port
// const app = express();
// const PORT = process.env.PORT || 3001;

// // Init our Session/Cookie
// // const userSession = {
// //     secret: process.env.DB_SESSION_SECRET,
// //     cookie: {
// //         // Add a timer
// //         maxAge: 7200000
// //     },
// //     resave: false,
// //     saveUninitialized: true,
// //     store: new SequelizeStore({
// //         db: sequelize
// //     })
// // };

// // Init our Handlebars Helpers
// const expHandlebars = handlebars.create({ helpers });

// // Setup Middleware and app
// app.set('view engine', 'handlebars');
// app.engine('handlebars', expHandlebars.engine);
// app.use(express.static(path.join(__dirname, 'public')));
// //app.use(session(userSession));
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(routes);
// app.use(cookieParser('secret'));
// app.use(cookieSession({
//     secret: process.env.DB_SESSION_SECRET,
//     cookie: {
//         // Add a timer
//         maxAge: 7200000
//     },
//     resave: false,
//     saveUninitialized: true,
//     store: new SequelizeStore({
//         db: sequelize
//     })
// }));

// // Start connection with sequelize
// sequelize.sync({
//     // No force to maintain normal operations
//     force: false
// }).then(() => {
//     app.listen(PORT, () => console.log(`Listening on Port: ${PORT}`));
// });


// const path = require('path');
// require('dotenv').config();
// const express = require('express');
// const routes = require('./controllers/');
// const sequelize = require('./config/connection');
// const exphbs = require('express-handlebars')
// const session = require('express-session')
// const SequelizeStore = require('connect-session-sequelize')(session.Store);
// const helpers = require('./utils/helpers');

// const hbs = exphbs.create({ helpers });

// // Initialize sessions
// const sess = {
//     secret: process.env.DB_SESSION_SECRET,
//     cookie: { maxAge: 7200000 },
//     resave: false,
//     saveUninitialized: true,
//     store: new SequelizeStore({
//         db: sequelize
//     })
// };

// // Initialize the server
// const app = express();
// // Define the port for the server
// const PORT = process.env.PORT || 3001;

// // Give the server a path to the public directory for static files
// app.use(express.static(path.join(__dirname, 'public')));

// // Set handlebars as the template engine for the server
// app.engine('handlebars', hbs.engine);
// app.set('view engine', 'handlebars');

// // Have Express parse JSON and string data
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // Tell the app to use Express Session for the session handling
// app.use(session(sess));

// // Give the server the path to the routes
// app.use(routes);

// // Turn on connection to db and then to the server
// // force: true to reset the database and clear all values, updating any new relationships
// // force: false to maintain data - aka normal operation
// sequelize.sync({ force: false }).then(() => {
//     app.listen(PORT, () => console.log('Now listening'));
// });

const path = require("path");
const express = require("express");
const session = require("express-session");
const exphbs = require("express-handlebars");

const app = express();
const PORT = process.env.PORT || 3001;

const sequelize = require("./config/connection");
const SequelizeStore = require("connect-session-sequelize")(session.Store);

const sess = {
    secret: "Chamber of Secrets",
    cookie: {},
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize,
    }),
};
app.use(session(sess));

const helpers = require("./utils/helpers");

const hbs = exphbs.create({ helpers });

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use(require("./controllers/"));

sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log(`Now listening`));
});