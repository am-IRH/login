const bcrypt = require("bcryptjs");
const passport = require("passport");

const User = require("@model/user");

exports.login = (req, res) => {
    if (req.isAuthenticated()) res.redirect("/");
    res.render("login");
}

exports.handleLogin = (req, res, next) => {
    passport.authenticate("local", {
        // successRedirect: "/",
        failureRedirect: "/user/login",
    })(req, res, next);

};

exports.rememberme = (req, res, next) => {
    if (req.body.rememberme) {
        req.session.cookie.originalMaxAge = 24 * 60 * 60 * 1000;
    } else {
        req.session.cookie.expire = null;
    }
    res.redirect("/")
}


exports.signup = (req, res) => {
    if (req.isAuthenticated()) res.redirect("/");
    res.render("signup");
}

exports.handleSignup = async (req, res) => {
    try {
        const { email, name, password } = req.body;
        const findEmail = await User.findOne({email});
        if(findEmail) res.redirect("/user/register");

        const hash = await bcrypt.hash(password, 1);
        const user = await User.create({name, email, password: hash});
        res.redirect("/user/login")
    } catch (err) {
        console.log(err);
        res.redirect("/user/signup");
    }
}

exports.logout = (req, res) => {
    req.logout();
    if (req.session) {
        // delete session object
        req.session.destroy(function(err) {
            if(err) {
                return next(err);
            } else {
                req.session = null;
            }
        });
    } 
    res.redirect("/user/login");
}


exports.resetPassword = async (req, res) => {
    if (!req.isAuthenticated()) res.redirect("/user/login");
    res.render("reset-password");
};

exports.handleResetPassword = async (req, res) => {
    const { password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
        return res.render("reset-password");
    }

    const user = await User.findOne({ _id: req.user.id });

    if (!user) return res.redirect("/404");

    const hash = await bcrypt.hash(password, 1);
    user.password = hash;
    await user.save();

    res.redirect("/user/logout");
}