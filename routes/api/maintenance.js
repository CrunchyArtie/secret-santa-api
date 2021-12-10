const express = require('express');
const ApiResponse = require("../../response");
const _ = require("lodash");
const router = express.Router();
const db = require("../../models/index");

router.get('/', (req, res, next) => {
    if (process.env.FORCE_DOWN_FOR_MAINTENANCE) {
        res.send(new ApiResponse(true));
    } else {
        db.Config.findOne({where: {key: 'maintenance'}})
            .then((parameter) => {
                if (!!parameter && (parameter.value === 'true' || parameter.value === 'false')) {
                    return res.send(new ApiResponse(parameter.value === 'true'));
                } else {
                    return res.send(new ApiResponse(process.env.FORCE_DOWN_FOR_MAINTENANCE || false));
                }
            })
    }

});

module.exports = router;
