const Post = require("../models/post");

exports.getPosts = (req, res, next) => {
    Post.fetchAll()
        .then(([rows, metadata]) => {
            res.render("home", { rows: rows, pageTitle: "Home" });
            console.log(rows);
        })
        .catch();
};
