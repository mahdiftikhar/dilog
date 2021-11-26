const Post = require("../models/post");

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
