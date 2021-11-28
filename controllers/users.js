const User = require("../models/user");
const Post = require("../models/post");

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

        const prefil = userData.bio;

        res.render("user/edit-profile", {
            pageTitle: "Edit Profile",
            path: "/my-profile",
            bio_prefil: prefil,
        });
    });
};

exports.postEditProfile = (req, res, next) => {
    console.log("controllers - postEditProfile");

    const username = req.session.user.userName;
    const password = req.body.password;
    const bio = req.body.bio;
    const dp = req.body.dp;
    let userData;

    console.log(username);
    if (bio) {
        console.log(bio);
    }

    if (dp) {
        console.log(dp);
    }
    if (password) {
        console.log(password);
    }

    User.fetchByName(username).then(([rows, metadata]) => {
        userData = rows[0];

        // console.log(userData);
    });

    console.log("---------");
    console.log(userData);

    res.redirect("/my-profile");
};
