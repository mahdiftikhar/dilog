const express = require("express");

const homeController = require("../controllers/home");
const userController = require("../controllers/users");
const signupController = require("../controllers/signup");

const router = express.Router();

router.get("/", (req, res, next) => {
    res.render("login", {
        pageTitle: "Log in",
        path: "/",
    });
});

router.get("/signup", (req, res, next) => {
    res.render("signup", {
        pageTitle: "Signup",
        path: "/signup",
    });
});

router.post("/signup", signupController.validateSignup);

router.post("/", userController.validateUser);

router.get("/home", homeController.getPosts);

router.get("/logout", homeController.getLogout);

module.exports = router;
