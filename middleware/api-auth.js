const jwt = require("jsonwebtoken");
const ApiResponse = require("../response");

const apiAuth = (req, res, next) => {
    const rawToken =
        req.body.token || req.query.token || req.headers["x-access-token"] || req.headers["authorization"];

    if (!rawToken) {
        return res.status(403).send(new ApiResponse(null, ["L'utilisateur doit être connecté."]));
    }

    const token = rawToken.startsWith("Bearer ") ? rawToken.replace('Bearer ') : rawToken;

    try {
        jwt.verify(token, process.env.JWT_PLATFORM_TOKEN, {}, (decoded) => {
            req.user = decoded;
        });
    } catch (err) {
        console.error(err);
        return res.status(401).send(new ApiResponse(null, ["Erreur lors de l'authentification"]));
    }
    return next();
};

module.exports = apiAuth;
