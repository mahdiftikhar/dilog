const Post = require("../models/post");
const Comment = require("../models/comment");
const User = require("../models/user");
const PostReacts = require("../models/post-reacts");
const CommentReact = require("../models/comment-react");
const Follows = require("../models/follows");
const { end } = require("../util/database");

exports.getPosts = (req, res, next) => {
    const user = req.session.user;
    const postsPerPage = 69;
    let pageNo = +req.query.pageNo;

    if (Number.isNaN(pageNo)) {
        pageNo = 0;
    }

    const startIndex = pageNo * postsPerPage;
    let endIndex = startIndex + postsPerPage;
    let lastPage = false;

    Post.fetchAll()
        .then(([data, metadata]) => {
            if (endIndex >= data.length) {
                endIndex = data.length - 1;
                lastPage = true;
            }

            const posts = data.slice(startIndex, endIndex);

            for (let post of posts) {
                if (post.userName === user.userName) {
                    post.isUser = true;
                }
            }

            res.render("user/home", {
                posts: posts,
                pageTitle: "My Posts",
                path: "/home",
                pageNo: pageNo,
                lastPage: lastPage,
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
    const myUserName = req.session.user.userName;
    let userData;
    let isFollowing;
    let n_followers;
    let n_following;

    User.fetchByName(userName)
        .then(([data, metadata]) => {
            userData = data[0];
            return Follows.isFollowingUser(myUserName, userName);
        })
        .then(([data, metadata]) => {
            isFollowing = data[0].count;
            return Follows.countFollowers(userName);
        })
        .then(([data, metadata]) => {
            n_followers = data[0].n_followers;
            return Follows.countFollowing(userName);
        })
        .then(([data, metadata]) => {
            n_following = data[0].n_following;

            return res.render("user/user-profile", {
                pageTitle: userData.userName,
                path: "/aaa",
                user: userData,
                isCurrentUser: userName === myUserName,
                alreadyFollowing: isFollowing,
                n_following: n_following,
                n_followers: n_followers,
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

exports.postDeleteComment = (req, res, next) => {
    const commentId = req.body.commentId;
    const postId = req.body.postId;

    Comment.deleteById(commentId)
        .then(([data, metadata]) => {
            return res.redirect("/post/" + postId);
        })
        .catch((err) => {
            console.log(err);
            res.redirect("/home");
        });
};

exports.getEditPost = (req, res, next) => {
    const postId = req.query.postId;
    const postUserName = req.query.userName;

    const user = req.session.user;

    if (postUserName !== user.userName) {
        return res.redirect("/home");
    }

    Post.fetchById(postId)
        .then(([data, metadata]) => {
            const postData = data[0];

            res.render("user/make-post", {
                pageTitle: "Edit Post" + postId,
                path: "/edit-post",
                post: postData,
            });
        })
        .catch((err) => {
            console.log(err);
        });
};

exports.postEditPost = (req, res, next) => {
    const postBody = req.body.postbody;
    const postTags = req.body.tags;
    const postImage = req.body.image;
    const postId = req.body.postId;

    Post.updateById(postId, postBody, postTags)
        .then(([data, metadata]) => {
            res.redirect("/post/" + postId);
        })
        .catch((err) => {
            res.redirect("/post/" + postId);
            console.log(err);
        });
};

exports.postDeletePost = (req, res, next) => {
    const postId = req.body.postId;

    Post.deleteById(postId)
        .then(([data, metaData]) => {
            res.redirect("/my-posts");
        })
        .catch((err) => {
            res.redirect("/home");
            console.log(err);
        });
};

exports.postLikePost = (req, res, next) => {
    console.log("----------------");

    const postId = req.body.postId;
    let reacts = +req.body.reacts;
    const userName = req.session.user.userName;

    PostReacts.fetchRow(postId, userName)
        .then(([data, metadata]) => {
            const rowData = data[0];

            if (!rowData) {
                reacts += 1;
                const postReact = new PostReacts(postId, userName);
                return postReact.save();
            } else {
                reacts -= 1;
                return PostReacts.deleteRow(postId, userName);
            }
        })
        .then(([data, metaData]) => {
            return Post.updateReact(postId, reacts);
        })
        .then(([data, metaData]) => {
            res.redirect("/post/" + postId);
        })
        .catch((err) => console.log(err));
};

exports.postLikeComment = (req, res, next) => {
    const commentId = req.body.commentId;
    const postId = req.body.postId;
    let reacts = +req.body.reacts;
    const userName = req.session.user.userName;

    CommentReact.fetchRow(commentId, userName)
        .then(([data, metaData]) => {
            const rowData = data[0];
            if (!rowData) {
                reacts += 1;
                const commentReact = new CommentReact(commentId, userName);
                return commentReact.save();
            } else {
                reacts -= 1;
                return CommentReact.deleteRow(commentId, userName);
            }
        })
        .then(([data, userName]) => {
            return Comment.updateReact(commentId, reacts);
        })
        .then(([data, metadata]) => {
            res.redirect("/post/" + postId);
        })
        .catch((err) => {
            console.log(err);
            res.redirect("/home");
        });
};
