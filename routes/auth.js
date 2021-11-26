const express = require("express");

const router = express.router();

router.get("/");

router.get("/", (req, res, next) => {
    res.render("user/login", {
        pageTitle: "Log in",
        path: "/",
    });
});

router.get("/signup", (req, res, next) => {
    res.render("user/signup", {
        pageTitle: "Signup",
        path: "/signup",
    });
});
