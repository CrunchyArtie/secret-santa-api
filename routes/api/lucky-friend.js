const express = require('express');
const apiAuth = require("../../middleware/api-auth");
const ApiResponse = require("../../response");
const router = express.Router();
const db = require("../../models/index");

/* GET users listing. */
router.get('/', apiAuth, (req, res, next) => {
  res.send(new ApiResponse('Romane'));
});

module.exports = router;
