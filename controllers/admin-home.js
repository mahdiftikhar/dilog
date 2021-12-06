const Post = require("../models/post");
const Comment = require("../models/comment");
const ReportedPost = require("../models/reported-post");

exports.getPosts = (req, res, next) => {
    Post.fetchAll()
        .then(([data, metadata]) => {
            res.render("admin/home", {
                posts: data,
                pageTitle: "admin-home",
                path: "/home",
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
                });
            });
        })
        .catch((err) => {
            console.log(err);
            res.redirect("/home");
        });
};
