const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
    res.render("dash/activeDirectory/activeDirectory");
});

router.post("/", async (_req, res) => {
    const users = ["Connected","Disconnected"];
    const ldap = ["Connected","Disconnected"];
    let data={
    }
    data.network = new Array(2).fill().map((_o, i) => {
        const o = {
            users: users[i],
            ldap: ldap[i],
            value: Math.floor(Math.random() * (50 - 20) + 20),
            value1: Math.floor(Math.random() * (60 - 10) + 5),
        };
        return o;
    });
    const names = ["Store"];
    data.store=new Array(1).fill().map((_o, i) => {
        const o = {
            label: names[i],
            actual: Math.floor(Math.random()*(101)),
            total: Math.floor(Math.random()*(101))
        };
        return o;
    });
    const  queue = ["queue"];
    data.queue=new Array(2).fill().map((_o, i) => ({
        name: queue[i],
        count: [Math.round(Math.random() * 20)]
    }));
    const disk = ["Bandwidth"];
    data.disk=new Array(2).fill().map((_o, i) => ({
        name: disk[i],
        count: [Math.round(Math.random() * (80000000 - 50000000) + 50000000)]
    }));
    res.json(data);
});

router.post("/store", async (_req, res) => {
    const names = ["Store"];
    const data = new Array(1).fill().map((_o, i) => {
        const o = {
            label: names[i],
            actual: Math.floor(Math.random()*(101)),
            total: Math.floor(Math.random()*(101))
        };
        return o;
    });
    res.json(data);
});

module.exports = router;
