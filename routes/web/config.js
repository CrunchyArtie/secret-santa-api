const express = require('express');
const _ = require("lodash");
const db = require("../../models/index");
const webAuth = require("../../middleware/web-auth");
const router = express.Router();

router.get('/', webAuth, (req, res, next) => {
    let errors = [];
    const flash = req.query.flash;

    if (!!flash) {
        const temp = JSON.parse(flash);
        if (_.has(temp, 'errors')) {
            errors = temp.errors;
        }
    }

    db.Config.findAll()
        .then((config) => res.render('page-config', {config, errors}))
        .catch((err) => console.error(err))
});

router.post('/edit', webAuth, (req, res, next) => {
    const {key, value} = req.body;

    if (!key || !value) {
        res.redirect('/config?flash=' + JSON.stringify({errors: ['invalid data']}));
    } else {
        db.Config.update({value: value}, {where: {key: key}})
            .then(() => res.redirect('/config'))
            .catch((error) => {
                console.error(error);
                res.redirect('/config?flash=' + JSON.stringify({errors: ['Server error']}));
            })
    }
})

module.exports = router;
