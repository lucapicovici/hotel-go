var express  = require("express"),
    passport = require("passport"),
    router   = express.Router();

var Booking = require("../models/booking.js");

router.get("/", function(req, res){
    res.render("index");
});

router.get("/user/profile", isLoggedIn, function(req, res){
    res.render("user/profile");
});

router.get("/user/bookings", isLoggedIn, function(req, res){
    Booking.find({user: req.user._id})
        .populate('accommodation', 'name')
        .exec(function(err, bookings){
            if (err) {
                console.log(err);
                res.redirect("/user/profile");
            } else {
                res.render("bookings/index", {bookings: bookings});
            }
        });
});

router.post("/user/bookings", isLoggedIn, function(req, res){
    // Validations

    var form = req.body.book;
    var booking = new Booking({
        user: req.user._id,
        accommodation: form.accommodation,
        roomType: form.room,
        checkIn: form.checkIn,
        checkOut: form.checkOut,
        adults: form.adults,
        price: form.price
    });

    booking.save(function(err, booking){
        if (err) {
            console.log(err);
        } else {
            console.log(`Created booking id: ${booking._id}`);
            return res.redirect("/");
        }
    });
});

router.get("/user/bookings/:id", isLoggedIn, function(req, res){
    Booking.findById(req.params.id)
        .populate('user', 'email')
        .populate('accommodation', 'name')
        .exec(function(err, booking){
            if (err) {
                console.log(err);
                res.redirect("/user/profile");
            } else {
                res.render("bookings/show", {booking: booking});
            }
        });
});

router.get("/user/logout", isLoggedIn, function(req, res){
    req.logout();
    res.redirect("/");
});

router.use("/", notLoggedIn, function(req, res, next){
    next();
});

router.get("/user/register", function(req, res){
    console.log(req.session);
    var errMessages = req.flash("error");
    console.log(errMessages);
    res.render("user/register", {errMessages: errMessages});
});

router.post("/user/register", passport.authenticate("local.register", {
    failureRedirect: "/user/register",
    failureFlash: true
}), function(req, res){
    if (req.session.oldUrl) {
        var oldUrl = req.session.oldUrl;
        req.session.oldUrl = null;
        res.redirect(oldUrl);
    } else {
        res.redirect("/");
    }
});

router.get("/user/login", function(req, res){
    console.log(req.session);
    var errMessages = req.flash("error");
    res.render("user/login", {errMessages: errMessages});
});

router.post("/user/login", passport.authenticate("local.login", {
    failureRedirect: "/user/login",
    failureFlash: true
}), function(req, res){
    if (req.session.oldUrl) {
        var oldUrl = req.session.oldUrl;
        req.session.oldUrl = null;
        res.redirect(oldUrl);
    } else {
        res.redirect("/");
    }
});

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    req.session.oldUrl = req.url;
    res.redirect("/user/login");
}

function notLoggedIn(req, res, next) {
    if (!req.isAuthenticated()) {
        return next();
    }
    res.redirect("/");
}

module.exports = router;