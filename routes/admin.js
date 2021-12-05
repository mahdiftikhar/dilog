const express = require("express");

const adminHomeController = require("../controllers/admin-home");
const adminLoginController = require("../controllers/admin-auth");
const isAuth = require("../middleware/is-auth");

const router = express.Router();

router.get("/home", isAuth, adminHomeController.getPosts);

// router.get("/login", adminHomeController.getLogout);

router.post("/login", adminLoginController.postLogin);

router.get("/", adminLoginController.getLogin);

module.exports = router;
