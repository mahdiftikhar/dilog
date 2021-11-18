const User = require("../models/user");

exports.validateUser = (req, res, next) => {
    const name = req.body.name;
    const pass = req.body.password;

    User.fetchByIdPass(name, pass)
        .then(([data, metadata]) => {
            const temp = JSON.parse(JSON.stringify(data));

            if (!temp.length) {
                console.log("incorrect password/userid");
                return res.redirect("/");
            }
            return res.redirect("/home");
        })
        .catch((err) => {
            console.log(err);
        });
};
