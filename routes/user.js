const express = require("express");

const homeController = require("../controllers/home");
const userController = require("../controllers/users");

const router = express.Router();

router.get("/home", homeController.getPosts);

router.get("/logout", homeController.getLogout);

router.get("/forgotpassword");

module.exports = router;
