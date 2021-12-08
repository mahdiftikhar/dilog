const Post = require("../models/post");
const Comment = require("../models/comment");
const ReportedPost = require("../models/reported-post");
const ReportedComment = require("../models/reported-comment");

exports.getPosts = (req, res, next) => {
    Post.fetchAll()
        .then(([data, metadata]) => {
            res.render("admin/home", {
                posts: data,
                pageTitle: "admin-home",
                path: "/home",
                reportedPost: false,
            });
        })
        .catch((err) => console.log(err));
};

exports.getReportedPosts = (req, res, next) => {
    ReportedPost.fetchAll()
        .then(([data, metadata]) => {
            res.render("admin/reported-posts", {
                posts: data,
                pageTitle: "admin-reported-posts",
                path: "/admin/reported-posts",
                reportedPost: true,
            });
        })
        .catch((err) => console.log(err));
};

exports.getPostById = (req, res, next) => {
    const postid = req.params.postid;
    let commentToEdit = req.flash("commentId")[0];

    Post.fetchById(postid)
        .then(([posts, metadata]) => {
            const postData = posts[0];
            const user = req.session.user;
            let isUser = null;

            if (postData.userName === user.userName) {
                postData.isUser = true;
            }

            Comment.fetchByPostId(postData.id).then(([comments, metaData]) => {
                for (let comment of comments) {
                    if (comment.userName === user.userName) {
                        comment.isUser = true;
                    }
                    if (comment.id === +commentToEdit) {
                        comment.edit = true;
                    }
                }

                return res.render("admin/post", {
                    pageTitle: postData.text.slice(0, 20) + "...",
                    path: "/post",
                    post: postData,
                    comments: comments,
                    reportedPost: false,
                });
            });
        })
        .catch((err) => {
            console.log(err);
            res.redirect("/home");
        });
};

exports.getReportedComments = (req, res, next) => {
    ReportedComment.fetchAll()
        .then(([data, metadata]) => {
            res.render("admin/reported-comments", {
                comments: data,
                pageTitle: "admin-reported-comments",
                path: "/reported-comments",
                reportedPost: true,
            });
        })
        .catch((err) => console.log(err));
};

exports.postDeletePost = (req, res, next) => {
    const postId = req.body.postId;

    Post.deleteById(postId)
        .then(([data, metaData]) => {
            res.redirect("/admin/home");
        })
        .catch((err) => {
            res.redirect("/admin/home");
            console.log(err);
        });
};

exports.postDeleteComment = (req, res, next) => {
    const commentId = req.body.commentId;
    const postId = req.body.postId;

    Comment.deleteById(commentId)
        .then(([data, metadata]) => {
            return res.redirect("/admin/post/" + postId);
        })
        .catch((err) => {
            console.log(err);
            res.redirect("/admin/home");
        });
};
