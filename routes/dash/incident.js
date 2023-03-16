const express = require("express");
const router = express.Router();
const bl = require("../../bl");

router.get("/", async (req, res) => {
    const data = await bl.incident.data();
    res.render("incident", { data });
});

router.post("/", async (req, res) => {
    const data = await bl.incident.data();
    res.json(data);
});

module.exports = router;
