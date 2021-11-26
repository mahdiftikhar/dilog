exports.getLogin = (req, res, next) => {
    res.render("user/login", {
        pageTitle: "Log in",
        path: "/",
    });
};

exports.getSignup = (req, res, next) => {
    res.render("user/signup", {
        pageTitle: "Signup",
        path: "/signup",
    });
};
