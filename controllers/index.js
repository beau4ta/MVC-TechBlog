const router = require('express').Router();

const apiRoutes = require('./api');
const dashRoutes = require('./dashRoute');
const homeRoutes = require('./homeRoute');

router.use('/api', apiRoutes);
router.use('/dashboard', dashRoutes);
router.use('/', homeRoutes);

router.use((req, res) => {
    res.status(404).end();
});

module.exports = router;