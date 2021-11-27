const bcrypt = require("bcryptjs");

const User = require("../models/user");

exports.getLogin = (req, res, next) => {
    const isLoggedin = req.session.isLoggedIn;

    res.render("user/login", {
        pageTitle: "Log in",
        path: "/",
        isAuthenticated: isLoggedin,
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
                if (err) console.log(err);

                res.redirect("/home");
            });
        })
        .catch((err) => console.log(err));
};

exports.postLogout = (req, res, next) => {
    req.session.destroy((err) => {
        if (err) console.log(err);
        res.redirect("/");
    });
};

exports.getSignup = (req, res, next) => {
    res.render("user/signup", {
        pageTitle: "Signup",
        path: "/signup",
    });
};

exports.postSignup = (req, res, next) => {
    const userName = req.body.userName;
    const email = req.body.email;
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;
    const dateOfBirth = req.body.dateOfBirth;

    User.findByName(userName)
        .then(([data, metaData]) => {
            if (data[0]) {
                return res.redirect("/signup");
            }
            return bcrypt
                .hash(password, 12)
                .then((hashedPassword) => {
                    const user = new User(
                        userName,
                        email,
                        null,
                        dateOfBirth,
                        null,
                        hashedPassword
                    );
                    return user.save();
                })
                .then((result) => {
                    return res.redirect("/");
                });
        })
        .catch((err) => {
            console.log(err);
            res.redirect("/signup");
        });
};
