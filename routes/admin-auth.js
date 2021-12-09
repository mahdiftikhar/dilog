const express = require("express");

const adminAuthController = require("../controllers/admin-auth");

const router = express.Router();

router.post("/login", adminAuthController.postLogin);

router.get("/", adminAuthController.getLogin);

router.post("/logout", adminAuthController.postLogout);

module.exports = router;
