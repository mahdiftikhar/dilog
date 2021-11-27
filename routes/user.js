const express = require("express");

const homeController = require("../controllers/home");
const userController = require("../controllers/users");
const postController = require("../controllers/posts");
const isAuth = require("../middleware/is-auth");

const router = express.Router();

router.get("/home", isAuth, homeController.getPosts);

router.get("/logout", isAuth, homeController.getLogout);

// router.get("/forgotpassword");

router.get("/make-post", postController.getMakePost);

router.post("/make-post", postController.postMakePost);

router.get("/my-posts", userController.getMyPosts);

router.get("/my-profile", userController.getMyProfile);

router.get("/edit-profile", userController.getEditProfile);

module.exports = router;
