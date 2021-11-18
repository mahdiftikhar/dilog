const Post = require("../models/post");

exports.getPosts = (req, res, next) => {
    Post.fetchAll()
        .then(([rows, metadata]) => {
            res.render("home", { rows: rows, pageTitle: "Home" });
        })
        .catch();
};

exports.getLogout = (req, res, next) => {
    res.render("login", {
        pageTitle: "Login",
        path: "/",
    });
};

exports.updateReacts = (req, res, next) => {
    console.log(req.body);
};
