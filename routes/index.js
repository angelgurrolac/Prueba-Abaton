const express = require("express");
const router = express.Router();
const moment = require("moment-timezone");

router.get("/", function (req, res) {
    res.render("login");
});

router.get("/login", async (req, res) => {
    res.render("login", {
        message: req.flash("error")
    });
});

router.post("/login", async (req, res) => {
    res.redirect("/dash");
});

router.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/");
});


router.get("/network", async (req, res) => {
    res.render("network");
});


module.exports = router;
