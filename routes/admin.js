const express = require("express");

const adminHomeController = require("../controllers/admin-home");
const { adminAuth } = require("../middleware/is-auth");

const router = express.Router();

router.get("/home", adminAuth, adminHomeController.getPosts);

router.get("/reported-posts", adminAuth, adminHomeController.getReportedPosts);

router.get(
    "/reported-comments",
    adminAuth,
    adminHomeController.getReportedComments
);

router.get("/post/:postid", adminAuth, adminHomeController.getPostById);

router.post("/delete-post", adminAuth, adminHomeController.postDeletePost);

router.post(
    "/delete-comment",
    adminAuth,
    adminHomeController.postDeleteComment
);


router.get("/followers/:userID", adminAuth, adminHomeController.getFollowers);

router.get("/following/:userID", adminAuth, adminHomeController.getFollowing);

router.get("/search", adminAuth, adminHomeController.getSearch);

router.post("/search", adminAuth, adminHomeController.postSearch);

router.get("/profile/:userId", adminAuth, adminHomeController.getUserProfile);

router.get("/ban", adminAuth, adminHomeController.banUser);

module.exports = router;
