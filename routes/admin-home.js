const path = require("path");

const express = require("express");

const homeController = require("../controllers/admin-home");

const router = express.Router();

// router.get("/forgot_password", (req, res, next) => {
//     res.render()
// });

router.get("/admin-home", homeController.getPosts);
router.get("/", homeController.getLogout);

module.exports = router;
