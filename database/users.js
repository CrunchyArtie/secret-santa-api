
const db = require("./db");

class Users {
    createUsersTable(cb, errCb) {
        const sql = `CREATE TABLE IF NOT EXISTS users
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

    update(updateData, whereData, cb, errCb) {
        const updateKeys = Object.keys(updateData).map(k => `${k} = ?`).join(',')
        const updateValues = Object.values(updateData);
        const whereKeys = Object.keys(whereData).map(k => `${k} = ?`).join(',')
        const whereValues = Object.values(whereData);
        const sql = `Update users SET ${updateKeys} WHERE ${whereKeys};`

        db.run(sql, [...updateValues, ...whereValues], err => {
            if (err && !errCb) {
                console.error(err.message);
            } else if (err) {
                errCb(err);
            } else {
                cb();
            }
        })
    }

    getUser(username, cb, errCb) {
        const sql = "SELECT username, hash FROM users WHERE username = ?";
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
        const sql = `INSERT INTO users (username, hash) VALUES (?, ?);`

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

    getAll(cb, errCb) {
        const sql = "SELECT username, hash FROM users";
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
}

const users = new Users();

module.exports = users;
