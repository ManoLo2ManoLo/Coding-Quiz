const router = require('express').Router();
const sequelize = require('../config/connection');
const { User, Score } = require('../Models');
const { withAuth, withNoAuth } = require('../utils/auth.js');

router.get('/', (req, res) => {
    
});