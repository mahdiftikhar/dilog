const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const flash = require("connect-flash");
const multer = require("multer");

const errorController = require("./controllers/error");
const User = require("./models/user");
const db = require("./util/database");

const app = express();
const port = process.env.PORT || 3000;

const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./images");
    },
    filename: (req, file, cb) => {
        cb(null, "test" + "-" + file.originalname);
    },
});

const fileFilter = (req, file, cb) => {
    if (
        file.mimetype === "image/png" ||
        file.mimetype === "image/jpg" ||
        file.mimetype === "image/jpeg"
    ) {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

app.set("view engine", "ejs");
app.set("views", "views");

const userRoutes = require("./routes/user");
const adminRoutes = require("./routes/admin");
const authRoutes = require("./routes/auth");
const adminAuthRoutes = require("./routes/admin-auth");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(
    multer({ storage: fileStorage, filefilter: fileFilter }).single("image")
);
app.use(express.static(path.join(__dirname, "public")));
app.use("/images", express.static(path.join(__dirname, "images")));
app.use(
    session({
        secret: "my secret",
        resave: false,
        saveUninitialized: false,
    })
);
app.use(flash());

app.use(authRoutes);
app.use(userRoutes);
app.use("/admin", adminAuthRoutes);
app.use("/admin", adminRoutes);

app.use(errorController.get404);

app.listen(port, (err) => {
    if (err) console.log(err);
});
