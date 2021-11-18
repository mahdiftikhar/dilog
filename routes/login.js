const path = require("path");

const express = require("express");

const userController = require("../controllers/users");

const router = express.Router();

router.get("/", (req, res, next) => {
    res.render("login", {
        pageTitle: "Log in",
        path: "/",
    });
});

router.post("/", userController.validateUser);

// sends to signup page
router.get("/signup", (req, res, next) => {
    res.render("signup", {
        pageTitle: "Sign Up",
        path: "/signup",
    });
});

module.exports = router;
