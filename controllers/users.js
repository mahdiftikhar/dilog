const User = require("../models/user");
const Post = require("../models/post");
const bcrypt = require("bcryptjs");

exports.getMyPosts = (req, res, next) => {
    const userName = req.session.user.userName;

    Post.fetchByUserName(userName)
        .then(([rows, metadata]) => {
            res.render("user/home", {
                posts: rows,
                pageTitle: "My Posts",
                path: "/my-posts",
            });
        })
        .catch((err) => {
            console.log(err);
        });
};

exports.getMyProfile = (req, res, next) => {
    const userName = req.session.user.userName;

    User.fetchByName(userName).then(([rows, metadata]) => {
        const userData = rows[0];
        res.render("user/my-profile", {
            pageTitle: "My Profile",
            user: userData,
            path: "/my-profile",
        });
    });
};

exports.getEditProfile = (req, res, next) => {
    const username = req.session.user.userName;

    User.fetchByName(username).then(([rows, metadata]) => {
        userData = rows[0];

        res.render("user/edit-profile", {
            pageTitle: "Edit Profile",
            path: "/my-profile",
            errorMessage: null,
            userData: userData,
        });
    });
};

exports.postEditProfile = (req, res, next) => {
    const username = req.session.user.userName;

    User.fetchByName(username)
        .then(([rows, metadata]) => {
            const userData = rows[0];

            const password = req.body.password;
            const confirm_password = req.body.confirm_password;
            const bio = req.body.bio;
            const dp = req.body.dp;
            let redirect = true;

            if (bio) {
                User.updateBio(username, bio)
                    .then(([rows, metadata]) => {})
                    .catch((err) => {
                        console.log(err);
                    });
            }

            if (dp) {
                // console.log(dp);
            }

            if (password) {
                if (!(password === confirm_password)) {
                    return res.render("user/edit-profile", {
                        pageTitle: "Edit Profile",
                        path: "/my-profile",
                        userData: userData,
                        errorMessage: "Passwords do not match",
                    });
                } else {
                    bcrypt.hash(password, 12).then((hashedPassword) => {
                        User.updatePassword(username, hashedPassword)
                            .then(([rows, metadata]) => {})
                            .catch((err) => {
                                console.log(err);
                            });
                    });
                }
            }

            res.redirect("/my-profile");
        })
        .catch((err) => {
            console.log(err);
        });
};
