var express = require("express"),
    router  = express.Router();

var Accommodation = require("../models/accommodation.js");

router.get("/", function(req, res){
    Accommodation.find({}, function(err, accommodation){
        if (err) {
            console.log(err);
        } else {
            res.render("accommodation/index", {accommodation: accommodation});
        }
    });
});

router.get("/:id", function(req, res){
    accommodationId = req.params.id;
    Accommodation.findById(accommodationId, function(err, accommodation){
        if (err) {
            console.log(err);
        } else {
            res.render("accommodation/show", {accommodation: accommodation});
        }
    });
});

module.exports = router;