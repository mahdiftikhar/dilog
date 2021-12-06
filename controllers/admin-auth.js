const bcrypt = require("bcryptjs");

const Admin = require("../models/admin");

exports.getLogin = (req, res, next) => {
    let message = req.flash("error");

    if (message.length > 0) {
        message = message[0];
    } else {
        message = null;
    }

    const adminLoggedIn = req.session.adminLoggedIn;

    console.log(adminLoggedIn, "------------------");

    if (adminLoggedIn) {
        return res.redirect("/home");
    }

    res.render("admin/login", {
        pageTitle: "Admin Log in",
        path: "/",
        errorMessage: message,
        reportedPosts: true,
    });
};

exports.postLogin = (req, res, next) => {
    const userName = req.body.userName;
    const password = req.body.password;

    Admin.fetchByName(userName)
        .then(([data, metadata]) => {
            const user = data[0];
            if (!user) {
                req.flash("error", "Invalid id or password");
                return res.redirect("/admin");
            }

            bcrypt
                .compare(password, user.password)
                .then((doMatch) => {
                    if (!doMatch) {
                        req.flash("error", "Invalid id or password");
                        return res.redirect("/admin");
                    }

                    req.session.adminLoggedIn = true;

                    console.log(req.session.adminLoggedIn), ">>>>>>>>>>>>>>";

                    req.session.user = user;
                    req.session.save((err) => {
                        if (err) console.log(err);
                        res.redirect("/admin/home");
                    });
                })
                .catch((err) => {
                    console.log(err);
                    res.redirect("/admin");
                });
        })
        .catch((err) => console.log(err));
};

exports.postLogout = (req, res, next) => {
    req.session.destroy((err) => {
        if (err) console.log(err);
        res.redirect("/admin");
    });
};
