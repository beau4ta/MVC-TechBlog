const router = require('express').Router();
const { User, Post, Comment } = require('../../models');
const withAuth = require('../../utils/auth');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

//Get all users
router.get('/', (req, res) => {
    User.findAll({
        attributes: { exclude: ['password'] }
    })
    .then(userData => res.json(userData))
    .catch (err => {
        console.log(err);
        res.status(500).json(err);
    });
});

//Get user by id
router.get('/:id', (req, res) => {
    User.findOne({
        attributes: {
            exclude: ['password']
        },
        where: {
            id: req.params.id
        },
        include: [{
            model: Post,
            attributes: ['id', 'title', 'post', 'date_created']
        },
        {
            model: Comment,
            attributes: ['id', 'comment', 'date_created'],
            include: {
                model: Post,
                attributes: ['title']
            }
        }]
    })
    .then(userData => {
        if (!userData) {
            res.status(404).json({
                message: 'No user found with this id!'
            });
            return;
        }
        res.json(userData)
    })
    .catch((err) => {
        console.log(err);
        res.status(500).json(err);
    });
});

//Add a new user
router.post('/', (req, res) => {
    User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    })
    .then(userData => {
        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.name = userData.name;
            req.session.loggedIn = true;
            res.json(userData);
        });
    })
    .catch((err) => {
        console.log(err);
        res.status(500).json(err);
    });
});

//Save login data
router.post('/login', (req, res) => {
    User.findOne({
        where: {
            email: req.body.email
        }
    })
    .then(userData => {
        if (!userData) {
            res.status(404).json({
                message: 'No user with that email address!'
            });
            return;
        }
        const verifyPass = userData.checkPassword(req.body.password);
        if (!verifyPass) {
            res.status(404).json({ message: 'Wrong password!'});
            return;
        }
        req.session.save(() => {
            req.session.user_id = userData.id;
            res.session.name = userData.name;
            req.session.loggedIn = true;
            res.redirect('/dashboard');
        });
        console.log(userData.name);
        console.log(req.session);
    });
});

//logout user
router.post('/logout', withAuth, (req, res) => {
    if (req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    };
});

//delete user
router.delete(':/id', withAuth, (req, res) => {
    User.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(userData => {
        if (!userData) {
            res.status(404).json({ message: 'No user found with this id!' })
            return;
        }
        res.json(userData);
    })
    .catch((err) => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;