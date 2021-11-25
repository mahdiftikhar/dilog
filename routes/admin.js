const express = require("express");

const adminHomeController = require("../controllers/admin-home");

const router = express.Router();

router.get("/home", adminHomeController.getPosts);

router.get("/login", adminHomeController.getLogout);

router.get("/", (req, res, next) => {
    return res.redirect("/admin/login");
});

module.exports = router;
