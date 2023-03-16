const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
    res.render("dash/av");
});

module.exports = router;
