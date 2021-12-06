var express = require('express');
const moment = require("moment");
const db = require("../db");
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
    const sql_create = `CREATE TABLE IF NOT EXISTS Livres (
  Livre_ID INTEGER PRIMARY KEY AUTOINCREMENT,
  Titre VARCHAR(100) NOT NULL,
  Auteur VARCHAR(100) NOT NULL,
  Commentaires TEXT
);`;

    db.run(sql_create, err => {
        if (err) {
            return console.error(err.message);
        }
        console.log("Création réussie de la table 'Livres'");
    });
    res.send(moment('14122022', 'DDMMYYYY').toDate());
});

module.exports = router;
