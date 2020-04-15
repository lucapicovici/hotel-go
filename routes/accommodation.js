var express = require("express"),
    router  = express.Router();

var Accommodation = require("../models/accommodation.js");

router.get("/", function(req, res){
    res.render("accommodation/index");
});

router.get("/:id", function(req, res){
    Accommodation.create({
        name: "Hotel Go",
        type: "Hotel",
        address: "Markeaton Street",
        photos: [
            {src: "https://r-cf.bstatic.com/images/hotel/max1280x900/130/130867441.jpg"},
            {src: "https://r-cf.bstatic.com/images/hotel/max1280x900/245/245147790.jpg"}
        ],
        description: "Hotel description here.",
        amenities: [
            "Wi-fi",
            "Bar"
        ],
        rating: 7.6,
        roomTypes: [
            {
                name: "Single room",
                peopleNo: 1,
                roomCount: 7,
                price: 55
            },
            {
                name: "Double room",
                peopleNo: 2,
                roomCount: 5,
                price: 79
            }
        ]
    });
    res.render("accommodation/show");
});

module.exports = router;