const User = require("../models/user");
const Post = require("../models/post");

exports.getMyPosts = (req, res, next) => {
    console.log("controllers - getMyPosts");
    const username = req.session.user.userName;                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        

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
    const username = req.session.user.userName;

    User.fetchInfo(username).then(([rows, metadata]) => {
        const userData = JSON.parse(JSON.stringify(rows))[0];

        temp = userData.dateOfBirth.split("-");

        console.log(userData.dateOfBirth);

        date = temp[0] + "-" + temp[1];

        if (temp[2][1] == "T") {
            date += "-" + temp[2][0];
        } else {
            date += "-" + temp[2][0] + temp[2][1];
        }

        console.log(date);
        userData.dateOfBirth = date;

        res.render("user/my-profile", {
            pageTitle: "My Profile",
            user: userData,
            path: "/my-profile",
        });
    });
};
