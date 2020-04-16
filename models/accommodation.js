var mongoose = require("mongoose");

var accommodationSchema = new mongoose.Schema({
    name: {type: String, required: true},
    type: {type: String, required: true},
    address: {type: String, required: true},
    photos: [
        {src: {type: String, required: true}}
    ],
    description: {type: String, required: true},
    amenities: [
        {type: String}
    ],
    rating: {type: Number},
    roomTypes: [
        {
            name: {type: String, required: true},
            peopleNo: {type: Number, required: true},
            roomCount: {type: Number, required: true},
            price: {type: Number, required: true}
        }
    ]
});

module.exports = mongoose.model("Accommodation", accommodationSchema);