const express = require("express");

const homeController = require("../controllers/home");
const userController = require("../controllers/users");
const postController = require("../controllers/posts");
const isAuth = require("../middleware/is-auth");

const router = express.Router();

router.get("/home", isAuth, homeController.getPosts);

router.get("/home/:postid", isAuth, homeController.getPostById);

router.get("/logout", isAuth, homeController.getLogout);

// router.get("/forgotpassword");

router.get("/make-post", isAuth, postController.getMakePost);

router.post("/make-post", isAuth, postController.postMakePost);

router.get("/my-posts", isAuth, userController.getMyPosts);

router.get("/my-profile", isAuth, userController.getMyProfile);

router.get("/edit-profile", isAuth, userController.getEditProfile);

router.post("/edit-profile", isAuth, userController.postEditProfile);

module.exports = router;
