const router = require('express').Router();
const { Score } = require('../Models')

router.get('/', (req, res) => {
    res.render('home')
});

router.get('/quiz', (req, res) => {
    res.render('home')
});

router.get('/high%20score', (req, res) => {
    Score.findAll()
    .then(dbScoreData => {
        const scores = dbScoreData.map(score => score.get({plain: true}));

        res.render('high-score', { scores })
    })
    .catch((err) => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.get('*', (req, res) => {
    res.render('home')
});

module.exports = router;