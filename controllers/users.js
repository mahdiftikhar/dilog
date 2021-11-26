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
            const temp = JSON.parse(JSON.stringify(data));

            console.log(temp);
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

    const username = "umair14040";

    Post.fetchByUsername(username)
        .then(([rows, metadata]) => {
            res.render("user/my-posts", {
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

    username = "umair14040";

    User.fetchInfo(username).then(([rows, metadata]) => {
        const userData = JSON.parse(JSON.stringify(rows))[0];

        temp = userData.dateOfBirth.split("-");

        date = temp[0] + "-" + temp[1];

        if (temp[2][1] == "T") {
            date += "-" + temp[2][0];
        } else {
            date += "-" + temp[2][0] + temp[2][1];
        }
        console.log(date);
        userData.dateOfBirth = date;

        res.render("user/my-profile", {
            pageTitle: "My Posts",
            user: userData,
        });
    });
};
