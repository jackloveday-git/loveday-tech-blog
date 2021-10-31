// API Comment Routes by Jack Loveday

// Import dependencies
const router = require('express').Router();
const withAuth = require('../../utils/auth');
const { Comment } = require('../../models');

// Get all comments
router.get('/', (req, res) => {
    Comment.findAll()
        .then(commentData => res.json(commentData))

    // Catch errors
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// Post new comment
router.post('/', withAuth, (req, res) => {
    if (req.session) {
        Comment.create({
                comment_text: req.body.comment_text,
                post_id: req.body.post_id,
                user_id: req.session.user_id
            })
            .then(commentData => res.json(commentData))

        // Catch errors
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    }
});

// Delete comment by id
router.delete('/:id', withAuth, (req, res) => {
    Comment.destroy({
            where: {
                id: req.params.id
            }
        })
        .then(commentData => {
            if (!commentData) {
                res.status(404).json({
                    message: `No comment with id: ${req.params.id}`
                });
                return;
            }
            res.json(commentData);
        })

    // Catch errors
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;