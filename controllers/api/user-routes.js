const router = require('express').Router();
const { User, Score } = require('../../Models');

router.get('/', (req, res) => {
    User.findAll({
        attributes: {
            exclude: ['password']
        },
        include: {
            model: Score,
            attributes: ['id', 'score', 'createdAt'],
            order: [['createdAt', 'DESC']]
        }
    })
    .then((dbUserData) => res.json(dbUserData))
    .catch((err) => {
        console.log(err);
        res.status(500).json(err);
    });
})

router.get('/:id', (req, res) => {
    User.findOne({
        attributes: {
            exclude: ['password']
        },
        include: {
            model: Score,
            attributes: ['id', 'score'],
            order: [['createdAt', 'DESC']]
        }
    })
    .then((dbUserData) => {
        if (!dbUserData) {
            res.status(404).json({ message: "No user found with this id" });
            return;
        }
        res.json(dbUserData);
    })
    .catch((err) => {
        console.log(err);
        res.status(500).json(err);
    });
})

router.post('/', (req, res) => {
    User.create({
        username: req.body.username,
        password: req.body.password
    })
    .then((dbUserData) => {
        req.session.save(() => {
            req.session.user_id = dbUserData.id;
            req.session.username = dbUserData.username;
            req.session.loggedIn = true;
            res.json(dbUserData);
        });
    })
    .catch((err) => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.post("/login", (req, res) => {
    User.findOne({
        where: {
            username: req.body.username,
        },
    }).then((dbUserData) => {
        if (!dbUserData) {
            res.status(400).json({ message: "No user exists with this email address" });
            return;
        }

        const validPassword = dbUserData.checkPassword(req.body.password);
  
        if (!validPassword) {
            console.log("logged in")
            res.status(400).json({ message: "Incorrect password entered" });
            return;
        }
  
        req.session.save(() => {
            req.session.user_id = dbUserData.id;
            req.session.username = dbUserData.username;
            req.session.loggedIn = true;
            res.json({ user: dbUserData, message: "You are now logged in!" });
        });
    });
});

router.post("/logout", (req, res) => {
    if (req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});

module.exports = router;