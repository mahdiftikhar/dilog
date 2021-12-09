const express = require("express");

const homeController = require("../controllers/home");
const userController = require("../controllers/users");
const postController = require("../controllers/posts");
const { userAuth } = require("../middleware/is-auth");

const router = express.Router();

router.get("/home", userAuth, homeController.getPosts);

router.get("/post/:postid", userAuth, homeController.getPostById);

router.get("/post/edit/:postid", userAuth, homeController.getEditPost);

router.get("/search", userAuth, homeController.getSearch);

router.post("/search", userAuth, homeController.postSearch);

router.get("/make-post", userAuth, postController.getMakePost);

router.post("/make-post", userAuth, postController.postMakePost);

router.get("/edit-post", userAuth, homeController.getEditPost);

router.post("/edit-post", userAuth, homeController.postEditPost);

router.post("/delete-post", userAuth, homeController.postDeletePost);

router.post("/like-post", userAuth, homeController.postLikePost);

router.post("/make-comment", userAuth, homeController.postMakeComment);

router.get("/edit-comment", userAuth, homeController.getEditComment);

router.post("/edit-comment", userAuth, homeController.postEditComment);

router.post("/delete-comment", userAuth, homeController.postDeleteComment);

router.post("/like-comment", userAuth, homeController.postLikeComment);

router.get("/my-posts", userAuth, userController.getMyPosts);

router.get("/my-profile", userAuth, userController.getMyProfile);

router.get("/profile/:userId", userAuth, homeController.getUserProfile);

router.get("/edit-profile", userAuth, userController.getEditProfile);

router.post("/edit-profile", userAuth, userController.postEditProfile);

router.get("/followers/:userID", userAuth, userController.getFollowers);

router.get("/following/:userID", userAuth, userController.getFollowing);

router.get("/report-post/:postID", userAuth, postController.getReportPost);

router.get("/reported?", userAuth, postController.getReportedPost);

router.get(
    "/report-comment/:commentID",
    userAuth,
    postController.getReportComment
);

router.get("/reported-comment?", userAuth, postController.getReportedComment);

router.get("/follow?", userAuth, userController.getFollowUser);

router.get("/unfollow?", userAuth, userController.getUnfollowUser);

module.exports = router;
