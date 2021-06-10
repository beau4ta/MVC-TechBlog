const router = require('express').Router();
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', withAuth, (req, res) => {
    Post.findAll({
        where: {
            user_id: req.session.user_id
        },
        attributes: ['id', 'title', 'post', 'date_created'],
        include: [
            {
                model: Comment,
                attributes: ['id', 'comment', 'date_created', 'post_id', 'user_id'],
                include: {
                    model: User,
                    attributes: ['name']
                }
            },
            {
                model: User,
                attributes: ['name']
            }
        ]
    })
    .then(postData => {
        const posts = postData.map(post => post.get({ plain: true}));
        res.render('dashboard', { posts, loggedIn: true });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.get('/edit/:id', withAuth, (req, res) => {
    Post.findOne({
        where: {
            id: req.params.id
        },
        attributes: ['id', 'title', 'post', 'date_created'],
        include: [
            {
                model: Comment,
                attributes: ['id', 'comment', 'date_created', 'post_id', 'user_id'],
                include: {
                    model: User,
                    attributes: ['name']
                }
            },
            {
                model: User,
                attributes: ['name']
            }
        ]
    })
    .then(postData => {
        if (!postData) {
            res.status(404).json({ message: 'There is no post with this id!' });
            return;
        }
        const post = postData.get({ plain: true });
        res.render('editPost', { post, loggedIn: true });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.get('/create', withAuth, (req, res) => {
    res.render('createPost', {loggedIn: true});
});

module.exports = router;