const flaggedPost = require("../models/flagged-posts");

exports.getPosts = (req, res, next) => {
    var r1;
    flaggedPost
        .fetchAll()
        .then(([rows, metadata]) => {
            r1 = rows;
        })
        .catch();

    flaggedPost
        .fetchFlaggedPosts()
        .then(([rows, metadata]) => {
            const r2 = rows;

            // console.log("---------------------------------");
            // console.log(r1);
            // console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");
            // console.log(r2);

            res.render("admin_dash", {
                rows1: r1,
                rows2: r2,
                pageTitle: "admin-home",
            });
        })
        .catch();
};
