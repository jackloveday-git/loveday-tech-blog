// Home Route by Jack Loveday

// Import dependencies
const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, Comment } = require('../models');

// Home page
router.get('/', (req, res) => {
    Post.findAll({
            attributes: [
                'id',
                'post_text',
                'title',
                'created_at',
            ],
            order: [
                [
                    'created_at',
                    'DESC'
                ]
            ],
            include: [{
                    model: User,
                    attributes: ['username']
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
                        model: User,
                        attributes: ['username']
                    }
                }
            ]
        })
        .then(postData => {
            const postsArr = postData.map(post => {
                post.get({
                    plain: true
                })
            });
            res.render('homepage', {
                postsArr,
                loggedIn: req.session.loggedIn
            });
        })

    // Catch errors
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// Single Post Page
router.get('/post/:id', (req, res) => {
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
                    model: User,
                    attributes: ['username']
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
                        model: User,
                        attributes: ['username']
                    }
                }
            ]
        })
        .then(postData => {
            if (!postData) {
                res.status(404).json({
                    message: `No post with id: ${req.params.id}`
                });
                return;
            }
            const post = postData.get({
                plain: true
            });
            res.render('single-post', {
                post,
                loggedIn: req.session.loggedIn
            });
        })

    // Catch errors
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// Login page
router.get('/login', (req, res) => {

    // Check if user is already logged in
    if (req.session.loggedIn) {
        // Send to homepage
        res.redirect('/');
        return;
    }
    res.render('login');
});

// Signup page
router.get('/signup', (req, res) => {

    // Check if user is logged in
    if (req.session.loggedIn) {

        // Redirect to homepage
        res.redirect('/');
        return;
    }
    res.render('signup');
});

module.exports = router;