const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
    res.render("licenses");
});

router.post("/", async (req, res) => {
    const firma = ["Self", "CA"].map((o) => ({
        name: o,
        count: Math.floor(Math.random() * (30 - 10) + 10),
    }));
    const use = ["Usados", "No usados"].map((o) => ({
        name: o,
        count: Math.floor(Math.random() * (30 - 10) + 10),
    }));

    const instances = ["man-ch-1", "WALPBX_1", "mngmnt-ch", "mayurNS", "Oracle_Wlmr",
    "avinash"].map(o => {
        return {
            type: o,
            actual: Math.floor(Math.random() * (20 - 1) + 1)
        };
    });

    res.json({firma, use, instances});
});

module.exports = router;