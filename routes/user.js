const express = require("express");

const homeController = require("../controllers/home");
const isAuth = require("../middleware/is-auth");

const router = express.Router();

router.get("/home", isAuth, homeController.getPosts);

router.get("/logout", isAuth, homeController.getLogout);

// router.get("/forgotpassword");

module.exports = router;
