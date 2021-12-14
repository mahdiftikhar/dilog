const Post = require("../models/post");
const { query } = require("../util/database");
const Comment = require("../models/comment");

exports.getMakePost = (req, res, next) => {
    res.render("user/make-post", {
        pageTitle: "make post",
        path: "/make-post",
        post: false,
    });
};

exports.postMakePost = (req, res, next) => {
    const text = req.body.postbody;
    const tags = req.body.tags;
    const image = req.file;
    let imageUrl;

    if (!image) {
        imageUrl = null;
    } else {
        imageUrl = image.path;
    }
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

    const post = new Post(
        null,
        username,
        tags,
        text,
        imageUrl,
        0,
        creationTime
    );

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

exports.getReportPost = (req, res, next) => {
    const postID = req.params.postID;

    res.render("user/report-reason", {
        pageTitle: "Reports",
        path: "/reports",
        postID: postID,
    });
};

exports.getReportedPost = (req, res, next) => {
    const query = req.query;
    const reportReason = req.query.type;
    const postID = req.query.postID;

    let date_ob = new Date();
    let date = ("0" + date_ob.getDate()).slice(-2);
    let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
    let year = date_ob.getFullYear();
    let hours = date_ob.getHours();
    let minutes = date_ob.getMinutes();
    let seconds = date_ob.getSeconds();
    const creationTime =
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

    Post.reportByID(postID, creationTime, reportReason)
        .then(([data, metadata]) => {
            return res.render("user/reported", {
                pageTitle: "Reported",
                path: "/reports",
            });
        })
        .catch((err) => {
            console.log(err);
            console.log("Could not report post");
            return res.redirect("/home");
        });
};

exports.getReportComment = (req, res, next) => {
    const commentID = req.params.commentID;

    res.render("user/report-reason-comment", {
        pageTitle: "Reports",
        path: "/reports",
        commentID: commentID,
    });
};

exports.getReportedComment = (req, res, next) => {
    const query = req.query;
    const reportReason = req.query.type;
    const commentID = req.query.commentID;

    let date_ob = new Date();
    let date = ("0" + date_ob.getDate()).slice(-2);
    let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
    let year = date_ob.getFullYear();
    let hours = date_ob.getHours();
    let minutes = date_ob.getMinutes();
    let seconds = date_ob.getSeconds();
    const creationTime =
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

    Comment.reportByID(commentID, creationTime, reportReason)
        .then(([data, metadata]) => {
            return res.render("user/reported", {
                pageTitle: "Reported",
                path: "/reports",
            });
        })
        .catch((err) => {
            console.log(err);
            console.log("Could not report post");
            return res.redirect("/home");
        });
};
