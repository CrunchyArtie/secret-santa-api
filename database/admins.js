const db = require("./db");

class Admins {
    createAdminsTable(cb, errCb) {
        const sql = `CREATE TABLE IF NOT EXISTS admins
                     (
                         username TEXT PRIMARY KEY,
                         hash TEXT NOT NULL
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

    getUser(username, cb, errCb) {
        const sql = "SELECT username, hash FROM admins WHERE username = ?";
        db.get(sql, username, (err, row) => {
            if (err && !errCb) {
                console.error(err.message);
            } else if (err) {
                errCb(err);
            } else {
                cb(row);
            }
        });
    }

    insertUser(data, cb, errCb) {
        const {username, hash} = data;
        const sql = `INSERT INTO admins (username, hash) VALUES (?, ?);`

        db.run(sql, [username, hash], err => {
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

const admins = new Admins();

module.exports = admins;
