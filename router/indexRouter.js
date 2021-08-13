module.exports = app => {
    app.use("/user", require("@router/userRouter"));

    app.use("/", (req, res) => {
        if (!req.isAuthenticated()) res.redirect("/user/login");
        res.render("index", {user: req.user});
    })
}