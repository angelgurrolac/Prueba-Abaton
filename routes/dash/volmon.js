const express = require("express");
const router = express.Router();
const bl = require("../../bl");

const stopwatch = {
    t0: new Date(),
    start: () => {
        t0 = new Date();
    },
    lap: text => {
        console.log(text, new Date().valueOf() - t0.valueOf());
    }
};

router.get("/", async (req, res) => {
    stopwatch.start();
    const branches = await bl.branch.listTopBranches();
    stopwatch.lap("listTopBranches");
    res.render("dash/vol_mon", { branches });
});

router.post("/", async (req, res) => {
    const queue = ["queue"];
    const resume = new Array(2).fill().map((_o, i) => ({
        name: queue[i],
        count: [Math.round(Math.random() * 200000)]
    }));
    stopwatch.start();
    const globalData = await bl.branch.getGlobalData();
    stopwatch.lap("getGlobalData");
    const branches = await bl.branch.listTopBranches();
    stopwatch.lap("listTopBranches");
    res.json({ globalData, branches, resume });
});

router.get("/:id", async (req, res) => {
    const id = req.params.id;
    const branch = await bl.branch.getBranch(id);
    res.render("dash/vol_mon_id", { branch });
});

router.post("/:id", async (req, res) => {
    const id = req.params.id;
    const data = await bl.branch.getBranchData(id);
    data.globalData = await bl.branch.getGlobalData();
    stopwatch.lap("getGlobalData");
    const queue = ["queue"];
    data.resume = new Array(2).fill().map((_o, i) => ({
        name: queue[i],
        count: [Math.round(Math.random() * 200000)]
    }));
    res.json(data);
});

module.exports = router;
