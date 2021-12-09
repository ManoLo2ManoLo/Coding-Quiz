const router = require('express').Router();

const ScoreRoutes = require('./score-routes');

router.use('/score', ScoreRoutes);

module.exports = router;
