const express = require('express');
const bcrypt = require("bcryptjs");
const router = express.Router();
const webAuth = require("../../middleware/web-auth");
const db = require('../../models/index');

router.get('/', webAuth, (req, res, next) => {
    db.User.findAll()
        .then((users) => {
            const usernames = users.map(u => u.get('username'));
            res.render('page-users', {users: usernames});
        })
        .catch((err) => {
            throw err
        })
});

router.post('/edit', webAuth, (req, res, next) => {
    const {username, password} = req.body;

    if (!username || !password) {
        res.render('page-users-edit', {errors: ['invalid credentials']});
    } else {
        db.User.update({'hash': bcrypt.hashSync(password, 10)}, {where: {username: username}})
            .then(() => res.redirect('/users'))
            .catch((error) => {
                console.error(error);
                res.render('page-users-edit', {username: req.params.key, errors: ['Server error']});
            })
    }
})

router.get('/edit/:key', webAuth, (req, res, next) => {
    res.render('page-users-edit', {username: req.params.key})
})

module.exports = router;
