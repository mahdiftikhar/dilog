const path = require("path");

const express = require("express");

// const postController = require("../controllers/users");

const router = express.Router();

router.get("/signup", (req, res, next) => {
    res.render("signup", {
        pageTitle: "Sign up",
        path: "/signup",
    });
});

module.exports = router;
