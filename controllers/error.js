exports.get404 = (req, res, next) => {
    let userSession = req.session.isLoggedIn;
    let adminSession = req.session.adminLoggedIn;
    res.status(404).render("404", {
        pageTitle: "Page not Found",
        path: "/",
        isUser: userSession,
        isAdmin: adminSession,
    });
};
