const router = require('express').Router();
const { User, Post, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

//Get all posts
router.get('/', (req, res) => {
    Post.findAll({
        attributes: ['id', 'title', 'post', 'date_created'],
        include: [
            {
                model: User,
                attributes: ['name']
            },
            {
                model: Comment,
                attributes: ['id', 'comment', 'date_created', 'post_id', 'user_id'],
                include: {
                    model: User,
                    attributes: ['name']
                }
            }
        ]
    })
    .then(postData => res.json(postData))
    .catch((err) => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.get('/:id', (req, res) => {
    Post.findOne({
        where: {
            id: req.params.id
        },
        attributes: ['id', 'title', 'post', 'date_created'],
        include: [
            {
                model: User,
                attributes: ['name']
            },
            {
                model: Comment,
                attributes: ['id', 'comment', 'date_created', 'post_id', 'user_id'],
                include: {
                    model: User,
                    attributes: ['name']
                }
            }    
        ]   
    })
    .then(postData => {
        if (!postData) {
        res.status(404).json({ message: 'There is no post with this id!' })
        return;
        }
        res.json(postData);
        console.log(postData)
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.post('/', withAuth, (req, res) => {
    Post.create({
        title: req.body.title,
        post: req.body.post,
        user_id: req.session.user_id
    })
    .then(postData => res.json(postData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.put('/:id', withAuth, (req, res) => {
    Post.update({
        title: req.body.title,
        post: req.body.post
    },
    {
        where: {
            id: req.params.id
        }
    })
    .then(postData => {
        if (!postData) {
            res.status(404).json({ message: 'There is no post with this id!' });
            return;
        }
        res.json(postData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.delete('/:id', withAuth, (req, res) => {
    Post.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(postData => {
        if (!postData) {
            res.status(404).json({ message: 'There is no post with this id!'});
            return;
        }
        res.json(postData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;