const express = require("express");

const homeController = require("../controllers/home");
const userController = require("../controllers/users");
const postController = require("../controllers/posts");
const isAuth = require("../middleware/is-auth");

const router = express.Router();

router.get("/home", isAuth, homeController.getPosts);

router.get("/post/:postid", isAuth, homeController.getPostById);

router.get("/post/edit/:postid", isAuth, homeController.getEditPost);

router.get("/search", isAuth, homeController.getSearch);

router.post("/search", isAuth, homeController.postSearch);

router.get("/make-post", isAuth, postController.getMakePost);

router.post("/make-post", isAuth, postController.postMakePost);

router.get("/edit-post", isAuth, homeController.getEditPost);

router.post("/edit-post", isAuth, homeController.postEditPost);

router.post("/delete-post", isAuth, homeController.postDeletePost);

router.post("/like-post", isAuth, homeController.postLikePost);

router.post("/make-comment", isAuth, homeController.postMakeComment);

router.get("/edit-comment", isAuth, homeController.getEditComment);

router.post("/edit-comment", isAuth, homeController.postEditComment);

router.post("/delete-comment", isAuth, homeController.postDeleteComment);

router.get("/my-posts", isAuth, userController.getMyPosts);

router.get("/my-profile", isAuth, userController.getMyProfile);

router.get("/profile/:userId", isAuth, homeController.getUserProfile);

router.get("/edit-profile", isAuth, userController.getEditProfile);

router.post("/edit-profile", isAuth, userController.postEditProfile);

router.get("/followers/:userID", isAuth, userController.getFollowers);

router.get("/following/:userID", isAuth, userController.getFollowing);

module.exports = router;
