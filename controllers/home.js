const Post = require("../models/post");
const Comment = require("../models/comment");
const User = require("../models/user");
const { post } = require("../routes/user");

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

exports.getSearch = (req, res, next) => {
    const matches = req.flash("matches");
    const matchType = req.flash("matchType")[0];
    const message = req.flash("error")[0];

    res.render("user/search", {
        pageTitle: "Search",
        path: "/search",
        matchType: matchType,
        matches: matches,
        errorMessage: message,
    });
};

exports.postSearch = (req, res, next) => {
    const key = req.body.search;
    const type = req.body.type;

    if (type === "user") {
        User.fetchLikeName(key)
            .then(([data, metadata]) => {
                const checker = data[0];

                if (!checker) {
                    req.flash("error", "No Matching User Found");
                } else {
                    req.flash("matchType", "user");
                    req.flash("matches", data);
                }
                res.redirect("/search");
            })
            .catch((err) => {
                console.log(err);
            });
    } else {
        Post.fetchLikeTag(key)
            .then(([data, metaData]) => {
                const checker = data[0];

                if (!checker) {
                    req.flash("error", "No Matching Post Found");
                } else {
                    req.flash("matchType", "post");
                    req.flash("matches", data);
                }
                res.redirect("/search");
            })
            .catch((err) => {
                console.log(err);
            });
    }
};

exports.getUserProfile = (req, res, next) => {
    res.redirect("/home");
};
