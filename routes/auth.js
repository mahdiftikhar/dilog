const express = require("express");

const authController = require("../controllers/auth");

const router = express.Router();

router.get("/", authController.getLogin);

router.post("/login", authController.postLogin);

router.post("/logout", authController.postLogout);

router.get("/signup", authController.getSignup);

module.exports = router;
 