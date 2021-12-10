const express = require('express');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../../models/index");
const webAuth = require('../../middleware/web-auth')
const router = express.Router();

router.get('/login', (req, res, next) => {
    if (!(res.session?.token))
        res.render('page-login');
    else
        res.redirect('/')
});

router.post('/login', (req, res, next) => {
    const {username, password} = req.body;
    if (!username || !password) {
        res.render('page-login', {errors: ['invalid credentials']});
    } else {
        db.Admin.findOne({where: {username: username}})
            .then((user) => {
                if (!!user && bcrypt.compareSync(password, user.hash)) {
                    req.session.token = jwt.sign(
                        {username},
                        process.env.JWT_PLATFORM_TOKEN
                    )
                    res.redirect('/');
                } else {
                    res.render('page-login', {errors: ['invalid credentials']});
                }
            }).catch((error) => {
                console.error(error);
                res.render('page-login', {errors: ['Server error']});
            }
        )
    }
});

router.get('/logout', webAuth, (req, res, next) => {
    req.session.destroy();
    res.redirect('/');
});

module.exports = router;
