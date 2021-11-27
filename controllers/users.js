const User = require("../models/user");
const Post = require("../models/post");
const { use } = require("../routes/user");

exports.validateUser = (req, res, next) => {
    const name = req.body.name;
    const pass = req.body.password;

    User.fetchByIdPass(name, pass)
        .then(([data, metadata]) => {
            const temp = JSON.parse(JSON.stringify(data));

            console.log(temp);

            if (!temp.length) {
                console.log(
                    "controllers/users ",
                    "incorrect password / userid"
                );
                return res.redirect("/");
            }
            return res.redirect("/home");
        })
        .catch((err) => {
            console.log(err);
        });
};

exports.validateSignup = (req, res, next) => {
    const name = req.body.name;
    const pass = req.body.password;
    const email = req.body.email;

    console.log(name, pass, email);

    User.addByIdEmailPass(name, email, pass)
        .then(([data, metadata]) => {
            console.log("User created successfully");
            return res.redirect("/home");
        })
        .catch((err) => {
            console.log(err);
            console.log("Could not signup");
            return res.redirect("/");
        });
};

exports.getMyPosts = (req, res, next) => {
    console.log("controllers - getMyPosts");
    const username = req.session.user.userName;                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        

    Post.fetchByUsername(username)
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
    console.log("controllers - getMyProfile");
    const username = req.session.user.userName;

    User.fetchInfo(username).then(([rows, metadata]) => {
        const userData = JSON.parse(JSON.stringify(rows))[0];

        temp = userData.dateOfBirth.split("-");

        // console.log(userData.dateOfBirth);

        date = temp[0] + "-" + temp[1];

        if (temp[2][1] == "T") {
            date += "-" + temp[2][0];
        } else {
            date += "-" + temp[2][0] + temp[2][1];
        }

        // console.log(date);
        userData.dateOfBirth = date;

        res.render("user/my-profile", {
            pageTitle: "My Profile",
            user: userData,
            path: "/my-profile",
        });
    });
};

exports.getEditProfile = (req, res, next) => {
    res.render("user/edit-profile", {
        pageTitle: "Edit Profile",
        path: "/my-profile",
    });
};

exports.postEditProfile = (req, res, next) => {
    console.log("controllers - postEditProfile");

    const username = req.session.user.userName;
    const password = req.body.password;
    const bio = req.body.bio;
    const dp = req.body.dp;

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

    res.redirect("/my-profile");
};
