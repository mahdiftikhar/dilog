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

router.post("/signup", (req, res, next) => {
    console.log(req.body, req.params);
});

module.exports = router;
