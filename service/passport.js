const passport = require("passport");
const { Strategy } = require("passport-local");
const bcrypt = require("bcryptjs")

const User = require("@model/user");

passport.use(new Strategy({usernameField: "email"}, async (email, password, done) => {
    try {
        const user = await User.findOne({email});
        if(!user) { 
            done("کاربری موجود نیست", false) 
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if(isMatch) {
            return done(null, user);
        } else {
            return done("ایمیل یا رمز عبور صحیح نیست", false);
        }
    } catch(err) {
        console.log(err);
    }
}));


passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
        done(err, user);
    });
});