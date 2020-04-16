var express = require("express"),
    router  = express.Router();

router.get("/", function(req, res){
    res.render("index");
});

router.get("/user/register", function(req, res){
    res.render("user/register");
});

router.get("/user/login", function(req, res){
    res.render("user/login");
});

module.exports = router;