const path = require("path");

const express = require("express");

// const postController = require("../controllers/users");
const signupController = require("../controllers/signup");

const router = express.Router();

router.get("/signup", (req, res, next) => {
    res.render("signup", {
        pageTitle: "Sign up",
        path: "/signup",
    });
});

router.post("/signup", signupController.validateSignup);

module.exports = router;
