var express    = require("express"),
    mongoose   = require("mongoose"),
    session    = require("express-session"),
    passport   = require("passport"),
    flash      = require("connect-flash"),
    validator  = require("express-validator"),
    bodyParser = require("body-parser"),
    seedDB     = require("./seeds.js");
    app        = express();

var indexRoutes         = require("./routes/index.js"),
    accommodationRoutes = require("./routes/accommodation.js");

require("./config/passport.js");

app.set("view engine", "ejs");
app.use(session({
    secret: "The secret ingredient for a great omelette is mexican chorizo sausage. Trust me.",
    saveUninitialized: false,
    resave: false
}));
app.use(bodyParser.urlencoded({extended: true}));
app.use(passport.initialize());
app.use(passport.session());
app.use(validator());
app.use(flash());
app.use(function(req, res, next){
    res.locals.isLoggedIn = req.isAuthenticated();
    res.locals.user = req.user;
    next();
});
app.use("/accommodation", accommodationRoutes);
app.use("/", indexRoutes);

mongoose.set("useUnifiedTopology", true);
mongoose.set("useNewUrlParser", true);
mongoose.connect("mongodb://localhost/hotel-go");
seedDB();


app.listen(3000, () => {
    console.log("hotel-go server is now listening on port 3000.");
});