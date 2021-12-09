const express = require('express');
const moment = require("moment");
const ApiResponse = require("../../models/response");
const router = express.Router();

/* GET users listing. */
router.get('/', (req, res, next) => {
    const rawDate = process.env.SECRET_SANTA_LIMIT_DATE;
    const dateFormat = process.env.SECRET_SANTA_LIMIT_DATE_FORMAT;
    const date = moment(rawDate, dateFormat).add(12, 'h');
    const apiFriendlyDate = date.utc().format();
    res.send(new ApiResponse(apiFriendlyDate));
});

module.exports = router;
