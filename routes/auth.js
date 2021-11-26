const express = require("express");

const authController = require("../controllers/auth");

const router = express.Router();

router.get("/", authController.getLogin);

router.post("/login", (req, res, next) => {
    console.log(req.params);
    console.log(req.body);
    res.redirect("/home");
});

router.get("/signup", authController.getSignup);

module.exports = router;
