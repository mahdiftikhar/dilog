const Post = require("../models/post");

exports.getPosts = (req, res, next) => {
    Post.fetchAll()
        .then(([data, metadata]) => {
            res.render("admin/home", {
                posts: data,
                pageTitle: "admin-home",
                path: "/home",
            });
        })
        .catch((err) => console.log(err));
};
