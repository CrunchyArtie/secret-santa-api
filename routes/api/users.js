const express = require('express');
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const ApiResponse = require("../../response");
const db = require("../../models/index");

router.post("/register", (req, res) => {
    try {
        const errors = [];
        const {username, password} = req.body;

        // Validate user input
        if (!username) {
            errors.push('Le pseudo est requis.');
        }
        if (!password) {
            errors.push('Le mot de passe est requis.')
        }

        if (errors.length > 0) {
            return res.status(401).send(new ApiResponse(null, errors).toJson());
        }

        db.User.findOne({where: {username: username}})
            .then((oldUser) => {
                if (!!oldUser) {
                    return res.status(409).send(new ApiResponse(null, ["Le pseudo est déjà utilisé."]).toJson());
                }

                const hash = bcrypt.hashSync(password, 10);
                const token = getToken(username)
                db.User.create({username: username, hash: hash})
                    .then(() => res.status(201).send(new ApiResponse({username, token}).toJson()))
                    .catch((error) => {
                        console.error(error);
                        return res.status(500).send(new ApiResponse(null, [error.message]).toJson());
                    });

            })
            .catch((error) => {
                console.error(error);
                return res.status(500).send(new ApiResponse(null, [error.message]).toJson());
            });
    } catch (error) {
        console.error(error);
        return res.status(500).send(new ApiResponse(null, [error.message]).toJson());
    }
});

router.post("/login", (req, res) => {
    try {
        const {username, password} = req.body;
        const errors = [];
        if (!username) {
            errors.push('Le pseudo est requis.');
        }
        if (!password) {
            errors.push('Le mot de passe est requis.')
        }
        if (errors.length > 0) {
            return res.status(409).send(new ApiResponse(null, errors).toJson());
        }

        db.User.findOne({where: {username: username}})
            .then((user) => {
                if (!!user && bcrypt.compareSync(password, user.hash)) {
                    const token = getToken(user)
                    return res.status(200).send(new ApiResponse({username: user.get('username'), token}).toJson());
                } else {
                    return res.status(400).send(new ApiResponse(null, ['Pas d\'utilisateur pour ces identifiants']).toJson());
                }
            }).catch((error) => {
                console.error(error);
                return res.status(500).send(new ApiResponse(null, [error.message]).toJson());
            }
        )
    } catch (error) {
        console.log(error);
        return res.status(500).send(new ApiResponse(null, [error.message]).toJson());
    }
});

function getToken(username) {
    return jwt.sign(
        {username: username},
        process.env.JWT_PLATFORM_TOKEN,
        {
            expiresIn: "2h",
        },
    );
}

module.exports = router;
