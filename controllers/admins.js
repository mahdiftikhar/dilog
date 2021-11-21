const Admin = require("../models/admin");

exports.validateAdmin = (req, res, next) => {
    const name = req.body.name;
    const pass = req.body.password;

    Admin.fetchByIdPass(name, pass)
        .then(([data, metadata]) => {
            const temp = JSON.parse(JSON.stringify(data));

            console.log(temp);

            if (!temp.length) {
                console.log(
                    "controllers/admins",
                    "incorrect password / adminid"
                );
                return res.redirect("/admin_login");
            }
            return res.redirect("/admin-home");
        })
        .catch((err) => {
            console.log(err);
        });
};