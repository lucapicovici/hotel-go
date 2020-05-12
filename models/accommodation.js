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
            beds: {type: String, required: true},
            peopleCount: {type: Number, required: true, min: 0},
            availableRooms: {type: Number, required: true, min: 0},
            facilities: [String],
            photos: [
                {src: {type: String, required: true}}
            ],
            price: {type: Number, required: true, min: 0}
        }
    ]
});

accommodationSchema.index({name: 1}, {unique: true});

module.exports = mongoose.model("Accommodation", accommodationSchema);