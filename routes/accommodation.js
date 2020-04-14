var express = require("express"),
    router  = express.Router();

router.get("/", function(req, res){
    res.render("accommodation/index");
});

router.get("/:id", function(req, res){
    res.render("accommodation/show");
});

module.exports = router;