const path = require("path");

const express = require("express");

const userController = require("../controllers/users");
const adminController = require("../controllers/admins");

const router = express.Router();

router.get("/admin/login", (req, res, next) => {
    res.render("admin/login", {
        pageTitle: "Admin Log in",
        path: "/admin/login",
    });
});

router.post("/admin/login", adminController.validateAdmin);

router.post("/", userController.validateUser);

router.get("/", (req, res, next) => {
    res.render("login", {
        pageTitle: "Log in",
        path: "/",
    });
});

module.exports = router;
