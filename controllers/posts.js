const Post = require("../models/post");

exports.getMakePost = (req, res, next) => {
    console.log("controllers - getMakePost");
    res.render("user/make-post", {
        pageTitle: "make post",
        path: "/make-post",
    });
};

exports.postMakePost = (req, res, next) => {
    console.log("controllers - postMakePost");

    const text = req.body.postbody;
    const tags = req.body.tags;
    const image = req.body.image;

    const username = req.session.user.userName;

    let date_ob = new Date();
    let date = ("0" + date_ob.getDate()).slice(-2);
    let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
    let year = date_ob.getFullYear();
    let hours = date_ob.getHours();
    let minutes = date_ob.getMinutes();
    let seconds = date_ob.getSeconds();

    let creationTime =
        year +
        "-" +
        month +
        "-" +
        date +
        " " +
        hours +
        ":" +
        minutes +
        ":" +
        seconds;

    const post = new Post(null, username, tags, text, image, 0, creationTime);

    post.save()
        .then(([data, metadata]) => {
            console.log("Post created successfully");
            return res.redirect("/home");
        })
        .catch((err) => {
            console.log(err);
            console.log("Could not make post");
            return res.redirect("/home");
        });
};
