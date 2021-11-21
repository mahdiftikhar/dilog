const path = require("path");

const express = require("express");

const homeController = require("../controllers/home");

const router = express.Router();

router.get("/home", homeController.getPosts);
router.post("/home", homeController.updateReacts);
router.get("/", homeController.getLogout);

module.exports = router;
