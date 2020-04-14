var express = require("express"),
    app     = express();

var indexRoutes         = require("./routes/index.js"),
    accommodationRoutes = require("./routes/accommodation.js");

app.set("view engine", "ejs");

app.use("/", indexRoutes);
app.use("/accommodation", accommodationRoutes);

app.listen(3000, () => {
    console.log("hotel-go server is now listening on port 3000.");
});