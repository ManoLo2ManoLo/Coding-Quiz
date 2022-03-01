const router = require('express').Router();
const sequelize = require('../config/connection');
const { User, Score } = require('../Models');
const { withAuth, withNoAuth } = require('../utils/auth.js');

router.get('/', (req, res) => {
    res.render('home')
});

router.get('/login', (req, res) => {
    res.render('login')
});

router.get('/signup', (req, res) => {
    res.render('signup')
});

module.exports = router;