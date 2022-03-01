const router = require('express').Router();
const sequelize = require('../../config/connection');
const { Score } = require('../../Models');

router.get('/', (req, res) => {
    Score.findAll({
        order: [['score', 'DESC']],
        attributes: [
            'id',
            'score',
            'user_id',
            [sequelize.literal('(SELECT username FROM user WHERE user.id = score.user_id)'), 'username']
        ]
    })
    .then((dbScoreData) => res.json(dbScoreData))
    .catch((err) => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;