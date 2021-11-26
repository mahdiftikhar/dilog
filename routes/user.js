const express = require("express");

const homeController = require("../controllers/home");
const userController = require("../controllers/users");
const postController = require("../controllers/posts");

const router = express.Router();

router.post("/signup", userController.validateSignup);

router.post("/", userController.validateUser);

router.get("/home", homeController.getPosts);

router.get("/logout", homeController.getLogout);

router.get("/forgotpassword");

router.get("/make-post", postController.getMakePost);

router.post("/make-post", postController.postMakePost);

router.get("/my-posts", userController.getMyPosts);

router.get("/my-profile", userController.getMyProfile);

module.exports = router;
