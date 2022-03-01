const router = require('express').Router();
const sequelize = require('../config/connection');
const { User, Score } = require('../Models');
const { withAuth, withNoAuth } = require('../utils/auth.js');

router.get('/', (req, res) => {
    res.render('home');
});

router.get('/login', withNoAuth, (req, res) => {
    res.render('login');
});

router.get('/signup', withNoAuth, (req, res) => {
    res.render('signup');
});

router.get('/profile', withAuth, (req, res) => {
    User.findOne({
        attributes: {
            exclude: ['password']
        },
        include: {
            model: Score,
            attributes: ['id', 'score', 'createdAt']
        }
    })
    .then((dbUserData) => {
        if (!dbUserData) {
            res.status(404).json({ message: "No user found with this id" });
            return;
        }
        const user = dbUserData.get({ plain: true });
        const attempts = user.scores.length;
        const scores = user.scores

        let average = 0;

        for (let i = 0; i < attempts; i++) {
            let score = scores[i].score
    
            average = average + score;
        }

        average = average / attempts;
        average = Math.round(average) || 0;

        res.render('dashboard', {user , average});
    })
    .catch((err) => {
        console.log(err);
        res.status(500).json(err);
    });
})

router.get('/profile/:user_id', withAuth, (req, res) => {
    if(req.params.user_id == req.session.user_id) {
        res.redirect('/profile');
    }

    User.findOne({
        attributes: {
            exclude: ['password']
        },
        include: {
            model: Score,
            attributes: ['id', 'score', 'createdAt']
        },
        where: {
            id: req.params.user_id
        }
    })
    .then((dbUserData) => {
        if (!dbUserData) {
            res.status(404).json({ message: "No user found with this id" });
            return;
        }
        const user = dbUserData.get({ plain: true });
        const attempts = user.scores.length;
        const scores = user.scores

        let average = 0;

        for (let i = 0; i < attempts; i++) {
            let score = scores[i].score
    
            average = average + score;
        }

        average = average / attempts;
        average = Math.round(average) || 0;

        res.render('profile', {user , average});
    })
    .catch((err) => {
        console.log(err);
        res.status(500).json(err);
    });
})

router.get('/highscore', (req, res) => {
    Score.findAll({
        order: [['score', 'DESC']],
        attributes: [
            'id',
            'score',
            'createdAt',
            'user_id',
            [sequelize.literal('(SELECT username FROM user WHERE user.id = score.user_id)'), 'username']
        ]
    })
    .then((dbScoreData) => {
        const scores = dbScoreData.map(score => score.get({ plain: true }));

        res.render('highscore', {scores})
    })
    .catch((err) => {
        console.log(err);
        res.status(500).json(err);
    });
})

router.get('/quiz', (req, res) => {
    res.render('quiz');
})

module.exports = router;