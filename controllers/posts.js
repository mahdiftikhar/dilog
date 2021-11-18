const Post = require("../models/post");

exports.getPosts = (req, res, next) => {
    Post.fetchAll()
        .then(([rows, metadata]) => {
            // res.render("home") {
            //     posts: rows,
            //     pageTitle: "Home",
            //     path: "/p"
            // }
            console.log(rows);
        })
        .catch();
};
