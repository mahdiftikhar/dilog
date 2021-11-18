const path = require("path");

const express = require("express");

const homeController = require("../controllers/home");

const router = express.Router();

router.get("/home", homeController.getPosts);
router.get("/", homeController.getLogout);
router.get("/home", homeController.getPosts);

router.post("/home", homeController.updateReacts);

module.exports = router;
