const express = require('express');
const bcrypt = require("bcryptjs");
const users = require("../../database/users");
const router = express.Router();
const webAuth = require("../../middleware/web-auth");

router.get('/', webAuth, (req, res, next) => {
    users.getAll((users) => {
        const usernames = users.map(u => u.username);
        res.render('page-users', {users: usernames});
    }, (err) => {
        throw err
    })
});

router.post('/edit', webAuth, (req, res, next) => {
    const {username, password} = req.body;

    if (!username || !password) {
        res.render('page-users-edit', {errors: ['invalid credentials']});
    } else {
        users.update(
            {hash: bcrypt.hashSync(password, 10)},
            {username: username},
            () => {
                res.redirect('/users')
            }, (error) => {
                console.error(error);
                res.render('page-users-edit', {username: req.params.key, errors: ['Server error']});
            }
        )
    }
})

router.get('/edit/:key', webAuth, (req, res, next) => {
    res.render('page-users-edit', {username: req.params.key})
})

module.exports = router;
