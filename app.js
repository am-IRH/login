const path = require("path");

const express = require("express");
const app = express();

const passport = require("passport");
const session = require("express-session");
const MongoStore = require('connect-mongo');

require('module-alias/register')

require("./db")();
//? dotenv config
require("dotenv").config({path: "config.env"});

//? parse url
app.use(express.urlencoded({extended: false}));

//* Passport Configuration
require("@service/passport");

//* set template enginer 
app.set("view engine", "ejs");
app.set("views", "view");

//* Session
app.use(
    session({
        secret: "secret",
        resave: false,
        saveUninitialized: false,
        store: MongoStore.create({ mongoUrl: 'mongodb://localhost:27017/user' })
    })
);

//* Passport
app.use(passport.initialize());
app.use(passport.session());

//? public page
app.use(express.static(path.join(__dirname, "public")));
//? router
require("@router/indexRouter")(app);

app.listen(3000, () => {
    console.log("is run 3000")
});