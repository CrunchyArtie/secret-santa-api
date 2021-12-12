const express = require('express');
const apiAuth = require("../../middleware/api-auth");
const ApiResponse = require("../../response");
const router = express.Router();


// A ne pas faire :
// Romane - Ade
// Ade - Justine
// Justine - Romane
// Marine - Florence
// Florence - Faustine
// Faustine - Marine


const mappingEnDur = {
    'Romanou': 'Flopichou',
    'Flopichou': 'Sirop d\'Erable',
    'Sirop d\'Erable': 'Marine',
    'Marine': 'Adé',
    'Adé': 'Ylladia',
    'Ylladia': 'Romanou',
}

/* GET users listing. */
router.get('/:username', apiAuth, (req, res, next) => {
    res.send(new ApiResponse(mappingEnDur[req.params.username]));
});

module.exports = router;
