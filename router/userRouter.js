const { Router } = require("express");
const router = new Router();

const userctrl = require("@ctrl/userctrl");

router.get("/login", userctrl.login);
router.post("/login", userctrl.handleLogin, [userctrl.rememberme]);

router.get("/signup", userctrl.signup);
router.post("/signup", userctrl.handleSignup);

router.get("/logout", userctrl.logout);

router.get("/reset-password", userctrl.resetPassword);
router.post("/reset-password", userctrl.handleResetPassword);

module.exports = router;