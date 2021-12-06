exports.userAuth = (req, res, next) => {
    if (!req.session.isLoggedIn) {
        return res.redirect("/");
    }
    next();
};

exports.adminAuth = (req, res, next) => {
    if (!req.session.adminLoggedIn) {
        return res.redirect("/admin");
    }
    next();
};
