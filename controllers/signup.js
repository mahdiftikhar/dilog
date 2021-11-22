const User = require("../models/user");

exports.validateSignup = (req, res, next) => {
    const name = req.body.name;
    const pass = req.body.password;
    const email = req.body.email;

    User.addByIdEmailPass(name, email, pass)
        .then(([data, metadata]) => {
            const temp = JSON.parse(JSON.stringify(data));

            console.log(temp);
            console.log("User created successfully");
            return res.redirect("/home");
        })
        .catch((err) => {
            console.log(err);
            console.log("Could not signup");
            return res.redirect("/");
        });
};
