const Post = require("../models/post");

exports.getPosts = (req, res, next) => {
    Post.fetchAll()
        .then(([data, metadata]) => {
            res.render("admin/home", {
                posts: data,
                pageTitle: "admin-home",
                path: "/home",
                reportedPosts: true,
                admin: true,
            });
        })
        .catch((err) => console.log(err));
};

// exports.getLogout = (req, res, next) => {
//     console.log("logout");
//     let message = req.flash("error");
//     res.render("admin/login", {
//         pageTitle: "Login",
//         path: "/",
//         errorMessage: message,
//         reportedPosts: true,
//     });
// };
