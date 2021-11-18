const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");

const db = require("./util/database");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

const signupRoutes = require("./routes/signup");
const homeRoutes = require("./routes/home");
const loginRoutes = require("./routes/login");
const adminHome = require("./routes/admin-home");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use(signupRoutes);
app.use(homeRoutes);
app.use(loginRoutes);
app.use(adminHome);

const port = 3000;
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
