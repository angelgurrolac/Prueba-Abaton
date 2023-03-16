const express = require("express");
const router = express.Router();

router.use("/teams", require("./te/teams"));
router.use("/webex", require("./te/webex"));
router.use("/ms365", require("./te/ms365"));
router.use("/skype", require("./te/skype"));
router.use("/zoom", require("./te/zoom"));

/**
 * GET /dash/te
 */
router.get("/", async (req, res) => {
    res.render("dash/te", { menu: "dash" });
});

/**
 * POST /dash/te
 */
router.post("/", async (req, res) => {
    var data = [];

    res.json(data);
});

module.exports = router;
