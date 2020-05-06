var mongoose = require("mongoose");

var bookingSchema = new mongoose.Schema({
	user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
	accommodation: {type: mongoose.Schema.Types.ObjectId, ref: 'Accommodation'},
	roomType: {type: String, required: true},
	checkIn: {type: Date, required: true},
	checkOut: {type: Date, required: true},
	adults: {type: Number, required: true, min: 0},
	price: {type: Number, required: true, min: 0}
});

module.exports = mongoose.model("Booking", bookingSchema);