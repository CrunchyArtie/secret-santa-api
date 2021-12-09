const apiAuth = (req, res, next) => {
    const token = req.session.token;

    if (!token) {
        return res.redirect('/');
    } else {
        return next();
    }
};

module.exports = apiAuth;
