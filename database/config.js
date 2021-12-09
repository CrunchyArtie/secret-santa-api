const db = require("./db");

class Config {
    createConfigTable(cb, errCb) {
        const sql = `CREATE TABLE IF NOT EXISTS config
                     (
                         key TEXT PRIMARY KEY,
                         value TEXT NOT NULL
                     );`

        db.run(sql, err => {
            if (err && !errCb) {
                console.error(err.message);
            } else if (err) {
                errCb(err);
            } else {
                cb();
            }
        });
    }

    getAll(cb, errCb) {
        const sql = "SELECT key, value FROM config";
        db.all(sql, (err, row) => {
            if (err && !errCb) {
                console.error(err.message);
            } else if (err) {
                errCb(err);
            } else {
                cb(row);
            }
        });
    }

    update(key, value, cb, errCb) {
        const sql = `Update config SET value = ? WHERE key = ?;`

        db.run(sql, [value, key], err => {
            if (err && !errCb) {
                console.error(err.message);
            } else if (err) {
                errCb(err);
            } else {
                cb();
            }
        })
    }

    getValue(key, cb, errCb) {
        const sql = "SELECT value FROM config WHERE key = ?";
        db.get(sql, key, (err, row) => {
            if (err && !errCb) {
                console.error(err.message);
            } else if (err) {
                errCb(err);
            } else {
                cb(row);
            }
        });
    }

    insertValue(data, cb, errCb) {
        const {key, value} = data;
        const sql = `INSERT INTO config (key, value) VALUES (?, ?);`

        db.run(sql, [key, value], err => {
            if (err && !errCb) {
                console.error(err.message);
            } else if (err) {
                errCb(err);
            } else {
                cb();
            }
        });
    }
}

const config = new Config();

module.exports = config;
