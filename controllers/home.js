const Post = require("../models/post");
const Comment = require("../models/comment");

exports.getPosts = (req, res, next) => {
    const user = req.session.user;

    Post.fetchAll()
        .then(([rows, metadata]) => {
            res.render("user/home", {
                posts: rows,
                pageTitle: "Home",
                path: "/home",
            });
        })
        .catch((err) => {
            console.log(err);
        });
};

exports.getPostById = (req, res, next) => {
    const postid = req.params.postid;

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
                }
                return res.render("user/post", {
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

exports.getLogout = (req, res, next) => {
    res.render("login", {
        pageTitle: "Login",
        path: "/home",
    });
};

exports.updateReacts = (req, res, next) => {
    console.log(req.body);
};
