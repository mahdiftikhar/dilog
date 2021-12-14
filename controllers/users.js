const User = require("../models/user");
const Post = require("../models/post");
const Follows = require("../models/follows");
const bcrypt = require("bcryptjs");

exports.getMyPosts = (req, res, next) => {
    const userName = req.session.user.userName;
    const postsPerPage = 69;
    let pageNo = +req.query.pageNo;

    if (Number.isNaN(pageNo)) {
        pageNo = 0;
    }

    const startIndex = pageNo * postsPerPage;
    let endIndex = startIndex + postsPerPage;
    let lastPage = false;
    let onePage = false;
    let posts;

    Post.fetchByUserName(userName)
        .then(([data, metadata]) => {
            if (data.length < postsPerPage) {
                onePage = true;
                endIndex = data.length;
            } else if (endIndex >= data.length) {
                endIndex = data.length;
                lastPage = true;
            }

            posts = data.slice(startIndex, endIndex);

            for (let post of posts) {
                post.isUser = true;
            }

            res.render("user/my-posts", {
                posts: posts,
                pageTitle: "My Posts",
                path: "/my-posts",
                pageNo: pageNo,
                lastPage: lastPage,
                onePage: onePage,
            });
        })
        .catch((err) => {
            console.log(err);
        });
};

exports.getMyProfile = (req, res, next) => {
    const userName = req.session.user.userName;
    let userData;
    let n_followers;
    let n_following;

    User.fetchByName(userName)
        .then(([data, metadata]) => {
            userData = data[0];
            return Follows.countFollowers(userName);
        })
        .then(([data, metadata]) => {
            n_followers = data[0].n_followers;
            return Follows.countFollowing(userName);
        })
        .then(([data, metadata]) => {
            n_following = data[0].n_following;

            return res.render("user/my-profile", {
                pageTitle: "My Profile",
                user: userData,
                path: "/my-profile",
                isCurrentUser: true,
                alreadyFollowing: false,
                n_following: n_following,
                n_followers: n_followers,
            });
        })
        .catch((err) => {
            res.redirect("/home");
            console.log(err);
        });
};

exports.getEditProfile = (req, res, next) => {
    const username = req.session.user.userName;

    User.fetchByName(username).then(([data, metadata]) => {
        userData = data[0];

        res.render("user/edit-profile", {
            pageTitle: "Edit Profile",
            path: "/my-profile",
            errorMessage: null,
            userData: userData,
        });
    });
};

exports.postEditProfile = (req, res, next) => {
    const username = req.session.user.userName;

    User.fetchByName(username)
        .then(([data, metadata]) => {
            const userData = data[0];

            const password = req.body.password;
            const confirm_password = req.body.confirm_password;
            const bio = req.body.bio;
            const oldImage = req.body.oldImage;
            const dp = req.file;
            let imageUrl;

            if (password) {
                if (!(password === confirm_password)) {
                    return res.render("user/edit-profile", {
                        pageTitle: "Edit Profile",
                        path: "/my-profile",
                        userData: userData,
                        errorMessage: "Passwords do not match",
                    });
                } else {
                    if (oldImage && !dp) {
                        imageUrl = oldImage;
                    } else if (!oldImage && !dp) {
                        imageUrl = null;
                    } else {
                        imageUrl = dp.path;
                    }

                    User.updateBioImage(username, bio, imageUrl)
                        .then(([data, metadata]) => {
                            return bcrypt.hash(password, 12);
                        })
                        .then((hashedPassword) => {
                            User.updatePassword(username, hashedPassword)
                                .then(([data, metadata]) => {})
                                .catch((err) => {
                                    console.log(err);
                                });
                        })
                        .catch((err) => {
                            console.log(err);
                        });
                }
            } else {
                if (oldImage && !dp) {
                    imageUrl = oldImage;
                } else if (!oldImage && !dp) {
                    imageUrl = null;
                } else {
                    imageUrl = dp.path;
                }

                User.updateBioImage(username, bio, imageUrl)
                    .then(([data, metadata]) => {})
                    .catch((err) => {
                        console.log(err);
                    });
            }

            return res.redirect("/my-profile");
        })
        .catch((err) => {
            console.log(err);
        });
};

exports.getFollowers = (req, res, next) => {
    const userName = req.params.userID;

    User.fetchFollowers(userName)
        .then(([data, metadata]) => {
            const followers = data;

            return res.render("user/followers-following", {
                pageTitle: "Followers",
                path: "/my-profile",
                followers: followers,
                heading: "Followers",
            });
        })
        .catch((err) => {
            console.log(err);
        });
};

exports.getFollowing = (req, res, next) => {
    const userName = req.params.userID;

    User.fetchFollowing(userName)
        .then(([data, metadata]) => {
            const following = data;

            return res.render("user/followers-following", {
                pageTitle: "Following",
                path: "/my-profile",
                followers: following,
                heading: "Following",
            });
        })
        .catch((err) => {
            console.log(err);
        });
};

exports.getFollowUser = (req, res, next) => {
    const toFollowUserName = req.query.followName;
    const myUserName = req.session.user.userName;

    const newPair = new Follows(myUserName, toFollowUserName);

    newPair
        .save()
        .then(([data, metadata]) => {
            return res.redirect("profile/" + toFollowUserName);
        })
        .catch((err) => {
            console.log(err);
        });
};

exports.getUnfollowUser = (req, res, next) => {
    const toUnfollowUserName = req.query.unfollowName;
    const myUserName = req.session.user.userName;

    Follows.unfollowUser(myUserName, toUnfollowUserName)
        .then(([data, metadata]) => {
            return res.redirect("profile/" + toUnfollowUserName);
        })
        .catch((err) => {
            console.log(err);
        });
};
