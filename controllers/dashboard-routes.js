// Dashboard Route by Jack Loveday
// Uses standard route GET/POST methods

// Import dependencies
const router = require('express').Router();
const sequelize = require('../config/connection');
const withAuth = require('../utils/auth')
const { Post, User, Comment } = require('../models');


// Render dashboard for authenticated user
router.get('/', withAuth, (req, res) => {
    Post.findAll({
            where: {

                // Check user id
                user_id: req.session.user_id
            },
            attributes: [
                'id',
                'post_text',
                'title',
                'created_at',
            ],
            include: [{
                    model: Comment,
                    attributes: [
                        'id',
                        'comment_text',
                        'post_id',
                        'user_id',
                        'created_at'
                    ],
                    include: {
                        model: User,
                        attributes: ['username']
                    }
                },
                {
                    model: User,
                    attributes: ['username']
                }
            ]
        })
        .then(postData => {

            // Serialize data and render our dashboard
            const posts = postData.map(post => post.get({ plain: true }));
            res.render('dashboard', { posts, loggedIn: true });
        })

    // Catch any errors
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// Edit Post Route
router.get('/edit/:id', withAuth, (req, res) => {

    // Find a post by id
    Post.findOne({
            where: {
                id: req.params.id
            },
            attributes: [
                'id',
                'post_text',
                'title',
                'created_at',
            ],
            include: [{
                    model: Comment,
                    attributes: [
                        'id',
                        'comment_text',
                        'post_id',
                        'user_id',
                        'created_at'
                    ],
                    include: {
                        model: User,
                        attributes: ['username']
                    }
                },
                {
                    model: User,
                    attributes: ['username']
                }
            ]
        })
        .then(postData => {

            // Validates postData
            if (!postData) {
                res.status(404).json({
                    message: `No Post with id: ${req.params.id} `
                });
                return;
            }
            const post = postData.get({
                plain: true
            });

            res.render('edit-post', {
                post,
                loggedIn: true
            });
        })

    // Catch errors
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// Edit User Route
router.get('/edituser', withAuth, (req, res) => {
    User.findOne({
            attributes: {
                exclude: [
                    'password'
                ]
            },
            where: {
                id: req.session.user_id
            }
        })
        .then(userData => {
            if (!userData) {
                res.status(404).json({
                    message: `No user with id: ${req.session.user_id}`
                });
                return;
            }
            const user = userData.get({ plain: true });
            res.render('edit-user', {
                user,
                loggedIn: true
            });
        })

    // Catch errors
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
});

module.exports = router;