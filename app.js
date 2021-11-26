const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");

const errorController = require("./controllers/error");
const User = require("./models/user");

const db = require("./util/database");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

const userRoutes = require("./routes/user");
const adminRoutes = require("./routes/admin");
const authRoutes = require("./routes/auth");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use(
    session({ secret: "my secret", resave: false, saveUninitialized: false })
);

// app.use((req, res, next) => {
//     User.findById()
//         .then((user) => {
//             console.log(user);
//         })
//         .catch((err) => console.log(err));
// });

app.use("/admin", adminRoutes);
app.use(userRoutes);
app.use(authRoutes);

app.use(errorController.get404);

const port = 3000;
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
