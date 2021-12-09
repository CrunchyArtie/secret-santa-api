const express = require('express');
const ApiResponse = require("../../models/response");
const config = require("../../database/config");
const _ = require("lodash");
const router = express.Router();

router.get('/', (req, res, next) => {
    if (process.env.FORCE_DOWN_FOR_MAINTENANCE) {
        res.send(new ApiResponse(true));
    } else {
        config.getValue('maintenance', (parameter) => {
            if (!!parameter && (parameter.value === 'true' || parameter.value === 'false')) {
                return res.send(new ApiResponse(parameter.value === 'true'));
            } else {
                return res.send(new ApiResponse(process.env.FORCE_DOWN_FOR_MAINTENANCE || false));
            }
        })
    }

});

module.exports = router;
