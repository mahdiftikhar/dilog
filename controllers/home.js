const Post = require("../models/post");
const Comment = require("../models/comment");
const User = require("../models/user");

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
    const userName = req.params.userId;

    User.fetchByName(userName)
        .then(([data, metadata]) => {
            const userData = data[0];

            return res.render("user/user-profile", {
                pageTitle: userData.userName,
                path: "/home",
                user: userData,
                isCurrentUser: false,
            });
        })
        .catch((err) => {
            res.redirect("/home");
            console.log(err);
        });
};

exports.getEditPost = (req, res, next) => {
    console.log(req.params);
    res.redirect("/home");
};

exports.postMakeComment = (req, res, next) => {
    const commentText = req.body.comment;
    const postId = req.body.postId;
    const userName = req.session.user.userName;

    let date = new Date();
    date = date.toISOString().replace("T", " ").slice(0, 19);

    const comment = new Comment(null, postId, userName, commentText, 0, date);

    comment
        .save()
        .then(([data, metaData]) => {
            // console.log(data);
            res.redirect("/post/" + postId);
        })
        .catch((err) => {
            console.log(err);
            res.redirect("/home");
        });
};

exports.getEditComment = (req, res, next) => {
    const commentId = req.query.commentId;
    const postId = req.query.postId;

    req.flash("commentId", commentId);

    res.redirect("/post/" + postId);
};

exports.postEditComment = (req, res, next) => {
    const newText = req.body.newText;
    const commentId = req.body.commentId;
    const postId = req.body.postId;

    Comment.updateText(commentId, newText)
        .then(([data, metaData]) => {
            res.redirect("/post/" + postId);
        })
        .catch((err) => {
            console.log(err);
        });
};
