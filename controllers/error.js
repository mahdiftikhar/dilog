exports.get404 = (req, res, next) => {
    let session = req.session.isLoggedIn;
    res.status(404).render("404", {
        pageTitle: "Page not Found",
        path: "/",
        isAdmin: session,
    });
};
