const Post = require("../models/post");

exports.getPosts = (req, res, next) => {
    const user = req.session.user;
    // console.log(user);

    Post.fetchAll()
        .then(([rows, metadata]) => {
            res.render("user/home", {
                posts: rows,
                pageTitle: "Home",
                path: "/home",
            });
        })
        .catch((err) => {
            console.log(err);
        });
};

exports.getPostById = (req, res, next) => {};

exports.getLogout = (req, res, next) => {
    res.render("login", {
        pageTitle: "Login",
        path: "/",
    });
};

exports.updateReacts = (req, res, next) => {
    console.log(req.body);
};
