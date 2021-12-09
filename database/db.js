const sqlite3 = require("sqlite3");
const path = require("path");

const db_name = path.join(__dirname, '..', process.env.SQLITE_DATABASE_PATH);
const db = new sqlite3.Database(db_name, err => {
    if (err) {
        return console.error(err.message);
    }
});

module.exports = db;
