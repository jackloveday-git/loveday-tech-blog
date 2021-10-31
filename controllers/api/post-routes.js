// API Post Routes by Jack Loveday

// Import dependencies
const router = require('express').Router();
const sequelize = require('../../config/connection');
const withAuth = require('../../utils/auth');
const { User, Post, Comment } = require('../../models');

// Get all posts
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
        .then(postData => res.json(postData))

    // Catch errors
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// Get post by id
router.get('/:id', (req, res) => {
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

            // Validate post data
            if (!postData) {
                res.status(404).json({
                    message: `No post with id: ${req.params.id}`
                });
                return;
            }
            res.json(postData);
        })

    // Catch errors
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// Create new post
router.post('/', withAuth, (req, res) => {
    Post.create({
            // Create from user input
            title: req.body.title,
            post_text: req.body.post_text,
            user_id: req.session.user_id
        })
        .then(postData => res.json(postData))

    // Catch errors
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// Edit an existing post by id
router.put('/:id', withAuth, (req, res) => {
    Post.update(req.body, {
            where: {
                id: req.params.id
            }
        })
        .then(postData => {
            if (!postData) {
                res.status(404).json({
                    message: `No post with id: ${req.params.id}`
                });
                return;
            }
            res.json(postData);
        })

    // Catch errors
    .catch(err => {
        console.log(err);
        res.status(500).json(err)
    });
});

// Delete an existing post by id
router.delete('/:id', withAuth, (req, res) => {
    Post.destroy({
            where: {
                id: req.params.id
            }
        })
        .then(postData => {
            if (!postData) {
                res.status(404).json({
                    message: `No post with id: ${req.params.id}`
                });
                return;
            }
            res.json(postData);
        })

    // Catch error
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;