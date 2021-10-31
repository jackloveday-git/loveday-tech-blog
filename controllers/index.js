// Routes' Index by Jack Loveday

// Import dependencies
const router = require('express').Router();
const homeRoutes = require('./home-routes.js');
const dashboardRoutes = require('./dashboard-routes.js');
const apiRoutes = require('./api');

// Define paths for routes
router.use('/', homeRoutes);
router.use('/dashboard', dashboardRoutes);
router.use('/api', apiRoutes);


// Catch any bad responses
router.use((req, res) => {
    res.status(404).end();
});

module.exports = router;