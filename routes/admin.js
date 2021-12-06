const express = require("express");

const adminHomeController = require("../controllers/admin-home");
const { adminAuth } = require("../middleware/is-auth");

const router = express.Router();

router.get("/home", adminAuth, adminHomeController.getPosts);

// router.get("/reported-posts", adminAuth, adminHomeController.getReportedPosts);

module.exports = router;
