const bcrypt = require("bcryptjs");

const User = require("../models/user");
const Recovery = require("../models/recovery");
const nodemailer = require("nodemailer");
const sendgridTransport = require("nodemailer-sendgrid-transport");

const transporter = nodemailer.createTransport(sendgridTransport({
    auth: {
        api_key: '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'
    }
}));

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
        reportedPosts: false,
    });
};

exports.postLogin = (req, res, next) => {
    const userName = req.body.userName;
    const password = req.body.password;

    User.fetchByName(userName)
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

    const isLoggedIn = req.session.isLoggedIn;

    if (isLoggedIn) {
        return res.redirect("/home");
    }

    res.render("user/signup", {
        pageTitle: "Signup",
        path: "/signup",
        errorMessage: message,
        reportedPosts: false,
    });
};

exports.postSignup = (req, res, next) => {
    const userName = req.body.userName;
    const email = req.body.email;
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;
    const dateOfBirth = req.body.dateOfBirth;

    if (password !== confirmPassword) {
        req.flash("error", "Passwords do not match");
        return res.redirect("/signup");
    }

    User.fetchByName(userName)
        .then(([rows, metaData]) => {
            if (rows[0]) {
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

exports.getRecovery = (req, res, next) => {
    res.render("user/recovery", {
        pageTitle: "Account Recovery",
        path: "/recovery",
        reportedPosts: false,
        errorMessage: "",
    });
};

exports.postRecovery = (req, res, next) => {
    const recoveryName = req.body.userName
    const tempPass = Math.floor(Math.random() * 1000000)

    User.fetchByName(recoveryName)
        .then(([rows, metadata]) => {
            if (!rows[0])
            {
                console.log("I AM HEREE NOW");
                req.flash("error", "You dont have an account");
                return res.redirect("/");
            }
            Recovery.fetchByName(recoveryName)
                .then(([rows, metadata]) => {
                    return bcrypt
                        .hash(tempPass.toString(), 12)
                        .then((hashedPassword) => {
                            const recovery = new Recovery(
                                recoveryName,
                                hashedPassword
                            );
                            req.session.isLoggedIn = true;
                            req.session.user = recoveryName;
                            req.session.cookie.maxAge = 300000;
                            req.session.save((err) => {
                                if (err) console.log(err);
                            });
                            if (rows[0]) {
                                return Recovery.updateByName(hashedPassword, recoveryName);
                            }
                            return recovery.save();
                        })
                        .then((result) => {
                            User.fetchEmail(recoveryName)
                                .then(([rows, metadata]) => {
                                    if (rows[0]) {
                                        res.redirect("/recoverylogin");
                                        return transporter.sendMail({
                                            to: rows[0].email,
                                            from: 'dilogSQL@gmail.com',
                                            subject: 'OTP',
                                            html: '<h1>Your OTP is: </h1><h2>' + tempPass + '</h2>'
                                        });
                                    }
                                    req.flash("error", "User does not exist");
                                    return res.redirect("/");
                                })
                                .catch((err) => {
                                    console.log(err);
                                    res.redirect("/recovery");
                                });
                        })
                        .catch((err) => {
                            console.log(err);
                        });
                })
                .catch((err) => {
                    console.log(err);
                    res.redirect("/recovery");
                });
        })
        .catch((err) => {
            console.log("LMAOO");
            if (err) console.log(err);
        });
};

exports.getRecoveryLogin = (req, res, next) => {
    res.render("user/recoverylogin", {
        pageTitle: "Login Recovery",
        path: "/recoverylogin",
        reportedPosts: false,
        errorMessage: "",
    });
};

exports.postRecoveryLogin = (req, res, next) => {
    const tempPass = req.body.verificationCode;
    const user = req.session.user;
    
    Recovery.fetchByName(user)
        .then(([data, metadata]) => {

            if (!data[0]) {
                req.flash("error", "You have not requested a verification code");
                return res.redirect("/recovery");
            }
            bcrypt
                .compare(tempPass, data[0].tempPass)
                .then((doMatch) => {
                    if (!doMatch) {
                        req.flash("error", "Invalid OTP");
                        return res.redirect("/recoverylogin");
                    }

                    Recovery.deleteByName(user)
                        .then(() => {
                            req.session.isLoggedIn = true;
                            req.session.user = user;
                            req.session.save((err) => {
                                if (err) console.log(err);
                                res.redirect("/");
                            });
                        })
                        .catch((err) => {
                            console.log(err);
                            res.redirect("/recoverylogin")
                        })
                })
                .catch((err) => {
                    console.log(err);
                    res.redirect("/recoverylogin");
                });
        })
        .catch((err) => console.log(err));
};
