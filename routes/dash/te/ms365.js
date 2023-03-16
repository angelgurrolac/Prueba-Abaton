const express = require("express");
const router = express.Router();
const period = require("../../period");
const bl = require("../../../bl");

/**
 * GET /dash/te/ms365/[_id_]
 */
router.get("/:id?", async (req, res) => {
    const buildname = "Microsoft 365 - Infraestructura";
    const periods = period.select("dashte");
    const build = await bl.main.get(); //TODO: Obtener info de bd para edificios
    const data = { build };
    res.render("dash/teams", {
        menu: "dash",
        buildname,
        periods,
        data
    });
});

/**
 * POST /dash/te/ms365/[_id_]
 */
router.post("/:id?", async (req, res) => {
    const bugs = ["No data", "Intrusion", "No-SSL", "Invalid Data"].map((o) => ({
        name: o,
        count: Math.floor(Math.random() * (30 - 10) + 10),
    }));
    const d = new Date();
    const line = new Array(42).fill().map((_o, i) => ({
        date: new Date(d.getFullYear(), d.getMonth(), d.getDate(), i, 0, 0).valueOf(),
        querytimeAvg: Math.floor(Math.random() * (30 - 10) + 10),
        querytimeMax: Math.floor(Math.random() * (80 - 25) + 25),
        jitterAvg: Math.floor(Math.random() * (3 - 0.1) + 0.1),
        jitterMax: Math.floor(Math.random() * (10 - 0.2) + 0.2),
        latencyAvg: Math.floor(Math.random() * (3 - 0.1) + 0.1),
        latencyMax: Math.floor(Math.random() * (10 - 1) + 1),
        lossAvg: Math.random() * (1 - 0.1) + 0.1,
        lossMax: Math.random() * (3 - 1) + 1,
        resptimeAvg: Math.floor(Math.random() * (3 - 0.1) + 0.1),
        resptimeMax: Math.floor(Math.random() * (10 - 0.2) + 0.2),
        xferrateAvg: Math.floor(Math.random() * (3000000 - 1000000) + 1000000),
        xferrateMax: Math.floor(Math.random() * (5000000 - 2000000) + 2000000),
        mosAvg: Math.floor(Math.random() * (5 - 3) + 3),
        mosMax: Math.floor(Math.random() * (6 - 4) + 4),
        pdvAvg: Math.floor(Math.random() * (5 - 0.1) + 0.1),
        pdvMax: Math.floor(Math.random() * (10 - 1) + 1),
        ptajitterAvg: Math.floor(Math.random() * (3 - 0.1) + 0.1),
        ptajitterMax: Math.floor(Math.random() * (10 - 0.2) + 0.2),
        ptalatencyAvg: Math.floor(Math.random() * (3 - 0.1) + 0.1),
        ptalatencyMax: Math.floor(Math.random() * (10 - 1) + 1),
        ptalossAvg: Math.random() * (1 - 0.1) + 0.1,
        ptalossMax: Math.random() * (3 - 1) + 1,
        ptvjitterAvg: Math.floor(Math.random() * (3 - 0.1) + 0.1),
        ptvjitterMax: Math.floor(Math.random() * (10 - 0.2) + 0.2),
        ptvlatencyAvg: Math.floor(Math.random() * (3 - 0.1) + 0.1),
        ptvlatencyMax: Math.floor(Math.random() * (10 - 1) + 1),
        ptvlossAvg: Math.random() * (1 - 0.1) + 0.1,
        ptvlossMax: Math.random() * (3 - 1) + 1,
    }));

    const ptvsummary = new Array(42).fill().map((_o, i) => ({
        date: new Date(d.getFullYear(), d.getMonth(), d.getDate(), i, 0, 0).valueOf(),
        jitter: Math.floor(Math.random() * (3 - 0.1) + 0.1),
        latency: Math.floor(Math.random() * (3 - 0.1) + 0.1),
        loss: Math.random() * (1 - 0.1) + 0.1
    }));

    const ptasummary = new Array(42).fill().map((_o, i) => ({
        date: new Date(d.getFullYear(), d.getMonth(), d.getDate(), i, 0, 0).valueOf(),
        jitter: Math.floor(Math.random() * (3 - 0.1) + 0.1),
        latency: Math.floor(Math.random() * (3 - 0.1) + 0.1),
        loss: Math.random() * (1 - 0.1) + 0.1
    }));

    res.json({bugs, line, ptvsummary, ptasummary});
});

module.exports = router;
