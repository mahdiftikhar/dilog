const path = require("path");

const express = require("express");

const postController = require("../controllers/posts");

const router = express.Router();

router.get("/home", postController.getPosts);

module.exports = router;
