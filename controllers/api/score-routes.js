const router = require('express').Router();
const { Score } = require('../../Models')

router.get('/', (req, res) => {
    Score.findAll()
    .then((dbScoreData) => res.json(dbScoreData))
    .catch((err) => {
        console.log(err);
        res.status(500).json(err);
    });
})

router.post("/", (req, res) => {
    Score.create({
        name: req.body.name,
        score: req.body.score,
    })
    .then(dbScoreData => res.json(dbScoreData))
    .catch((err) => {
        console.log(err);
        res.status(500).json(err);
    });
});


module.exports = router;