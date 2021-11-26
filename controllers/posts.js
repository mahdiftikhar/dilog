const Post = require("../models/post");

exports.getMakePost = (req, res, next) => {
    console.log("controllers - getMakePost");
    res.render("user/make-post", { pageTitle: "make post" });
};

exports.postMakePost = (req, res, next) => {
    console.log("controllers - postMakePost");

    const body = req.body.postbody;
    const tags = req.body.tags;
    const image = req.body.image;
    const username = "umair14040";

    Post.save(body, tags, username)
        .then(([data, metadata]) => {
            const temp = JSON.parse(JSON.stringify(data));
            console.log("Post created successfully");
            return res.redirect("/home");
        })
        .catch((err) => {
            console.log(err);
            console.log("Could not make post");
            return res.redirect("/home");
        });
};
