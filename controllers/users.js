const User = require("../models/user");

exports.validateUser = (req, res, next) => {
    const name = req.body.name;
    const pass = req.body.password;

    User.fetchByIdPass(name, pass, (data) => {
        console.log(data);
    });
};
