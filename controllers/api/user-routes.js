// API Post Routes by Jack Loveday

// Import dependencies
const router = require('express').Router();
const session = require('express-session');
const withAuth = require('../../utils/auth');
const { User, Post, Comment } = require('../../models');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

// Get all users
router.get('/', (req, res) => {
    User.findAll({
            attributes: {
                // Never show user passwords
                exclude: [
                    'password'
                ]
            }
        })
        .then(userData => res.json(userData))

    // Catch errors
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// Get user by id
router.get('/:id', (req, res) => {
    User.findOne({
            attributes: {
                exclude: [
                    'password'
                ]
            },
            where: {
                id: req.params.id
            },
            include: [{
                    model: Post,
                    attributes: [
                        'id',
                        'title',
                        'post_text',
                        'created_at'
                    ]
                },
                {
                    model: Comment,
                    attributes: [
                        'id',
                        'comment_text',
                        'post_id',
                        'user_id',
                        'created_at'
                    ],
                    include: {
                        model: Post,
                        attributes: ['title']
                    }
                }
            ]
        })
        .then(userData => {
            if (!userData) {
                res.status(404).json({
                    message: `No user with id: ${req.params.id}`
                });
                return;
            }
            res.json(userData);
        })

    // Catch errors
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// Create new user
router.post('/', (req, res) => {
    User.create({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        })
        .then(userData => {
            // Save user data
            req.session.save(() => {
                req.session.user_id = userData.id;
                req.session.username = userData.username;
                req.session.loggedIn = true;
                res.json(userData);
            });
        })

    // Catch errors
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// User Login functon
router.post('/login', (req, res) => {
    User.findOne({
        where: {
            email: req.body.email
        }
    }).then(userData => {
        if (!userData) {
            res.status(400).json({
                message: `Cannot login, no user with email: ${req.body.email}`
            });
            return;
        }

        // Valigate user password
        const userPw = userData.checkPassword(req.body.password);
        if (!userPw) {
            res.status(400).json({
                message: `Wrong user password`
            });
            return;
        }

        // Otherwise, save the info and log the user in
        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.username = userData.username;
            req.session.loggedIn = true;
            res.json({
                user: userData,
                message: `User: ${userData.username} is now logged in`
            });
        });
    });
});

// Logout function
router.post('/logout', withAuth, (req, res) => {

    // Check if user is logged in
    if (req.session.loggedIn) {
        req.session.destroy(() => {
            res.json({
                message: `User session has been ended`
            })
        });
    } else {

        // Return error status
        res.status(404).end();
    }
});

module.exports = router;