const User = require("../models/user");

exports.getLogin = (req, res, next) => {
    res.render("user/login", {
        pageTitle: "Log in",
        path: "/",
    });
};

exports.postLogin = (req, res, next) => {
    req.session.isLoggedIn = true;
    User.findByName("nullptr")
        .then(([data, metadata]) => {
            const user = data[0];
            req.session.isLoggedIn = true;
            req.session.user = user;
            req.session.save((err) => {
                console.log(err);
                res.redirect("/home");
            });
        })
        .catch((err) => console.log(err));
};

exports.postLogout = (req, res, next) => {
    req.session.destroy((err) => {
        console.log(err);
        res.redirect("/");
    });
};

exports.getSignup = (req, res, next) => {
    res.render("user/signup", {
        pageTitle: "Signup",
        path: "/signup",
    });
};
