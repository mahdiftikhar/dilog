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

module.exports = router;
