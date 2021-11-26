const flaggedPost = require("../models/reportpost");

exports.getPosts = (req, res, next) => {
    let r1;
    flaggedPost
        .fetchAll()
        .then(([rows, metadata]) => {
            r1 = rows;
        })
        .catch((err) => console.log(err));

    flaggedPost
        .fetchFlaggedPosts()
        .then(([rows, metadata]) => {
            const r2 = rows;

            res.render("admin/home", {
                rows1: r1,
                rows2: r2,
                pageTitle: "admin-home",
            });
        })
        .catch((err) => console.log(err));
};

exports.getLogout = (req, res, next) => {
    res.render("admin/login", {
        pageTitle: "Login",
        path: "/",
    });
};
