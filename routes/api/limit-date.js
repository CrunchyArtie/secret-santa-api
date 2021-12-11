const express = require('express');
const moment = require("moment");
const ApiResponse = require("../../response");
const db = require("../../models/index");
const router = express.Router();

/* GET users listing. */
router.get('/', (req, res, next) => {
    db.Config.findOne({where: {key: 'due_date'}})
        .then((parameter) => {
            if (!!parameter) {
                return res.send(new ApiResponse(parameter.value));
            } else {
                return res.send(new ApiResponse(moment().add(1, "y").utc().format()));
            }
        })
});

module.exports = router;
