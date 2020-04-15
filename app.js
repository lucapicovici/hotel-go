var express  = require("express"),
    mongoose = require("mongoose"),
    app      = express();

var indexRoutes         = require("./routes/index.js"),
    accommodationRoutes = require("./routes/accommodation.js");

app.set("view engine", "ejs");

mongoose.set("useUnifiedTopology", true);
mongoose.set("useNewUrlParser", true);
mongoose.connect("mongodb://localhost/hotel-go");

app.use("/", indexRoutes);
app.use("/accommodation", accommodationRoutes);

app.listen(3000, () => {
    console.log("hotel-go server is now listening on port 3000.");
});