const bcrypt = require("bcryptjs");

const User = require("../models/user");

exports.getLogin = (req, res, next) => {
    let message = req.flash("error");

    if (message.length > 0) {
        message = message[0];
    } else {
        message = null;
    }

    const isLoggedIn = req.session.isLoggedIn;

    if (isLoggedIn) {
        return res.redirect("/home");
    }

    res.render("user/login", {
        pageTitle: "Log in",
        path: "/",
        errorMessage: message,
    });
};

exports.postLogin = (req, res, next) => {
    const userName = req.body.userName;
    const password = req.body.password;

    User.findByName(userName)
        .then(([data, metadata]) => {
            const user = data[0];

            if (!user) {
                req.flash("error", "Invalid email or password");
                return res.redirect("/");
            }

            bcrypt
                .compare(password, user.password)
                .then((doMatch) => {
                    if (!doMatch) {
                        req.flash("error", "Invalid email or password");
                        return res.redirect("/");
                    }

                    req.session.isLoggedIn = true;
                    req.session.user = user;
                    req.session.save((err) => {
                        if (err) console.log(err);
                        res.redirect("/home");
                    });
                })
                .catch((err) => {
                    console.log(err);
                    res.redirect("/");
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
    let message = req.flash("error");

    if (message.length > 0) {
        message = message[0];
    } else {
        message = null;
    }

    res.render("user/signup", {
        pageTitle: "Signup",
        path: "/signup",
        errorMessage: message,
    });
};

exports.postSignup = (req, res, next) => {
    const userName = req.body.userName;
    const email = req.body.email;
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;
    const dateOfBirth = req.body.dateOfBirth;

    if (password !== confirmPassword) {
        req.flash("error", "Paswords do not Match");
        return res.redirect("/signup");
    }

    User.findByName(userName)
        .then(([data, metaData]) => {
            if (data[0]) {
                req.flash("error", "Username needs to be unique");
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
