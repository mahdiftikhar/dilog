const path = require("path");

const express = require("express");

const homeController = require("../controllers/admin-home");

const router = express.Router();

// router.get("/forgot_password", (req, res, next) => {
//     res.render()
// });

router.get("/admin-home", homeController.getPosts);
<<<<<<< HEAD
// router.get("/", homeController.getLogout);
// router.post("/home", homeController.updateReacts);
=======
router.get("/", homeController.getLogout);
>>>>>>> 672d6204864cd52ff6f9f89e9708f43e51172fcc

module.exports = router;
