const express = require("express");
const authController = require("../controllers/auth");

const router = express.Router();

router.get("/", authController.getLogin);

router.get("/signup", (req, res, next) => {
    res.render("user/signup", {
        pageTitle: "Signup",
        path: "/signup",
    });
});
router.post("/login", authController.postLogin);

router.get("/signup", authController.getSignup);

router.post("/signup", authController.postSignup);

router.post("/logout", authController.postLogout);

module.exports = router;
