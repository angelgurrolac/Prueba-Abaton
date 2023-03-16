const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
    res.render("dash");
});

router.use("/av", require("./dash/av"));
router.use("/branch", require("./dash/branch"));
router.use("/cmdb", require("./dash/cmdb"));
router.use("/ap", require("./dash/ap"));
router.use("/incident", require("./dash/incident"));
router.use("/servers",require("./dash/servers"));
router.use("/vpn",require("./dash/vpn"));
router.use("/activeDirectory",require("./dash/activeDirectory"));
router.use("/ips",require("./dash/ips"));
router.use("/licenses",require("./dash/licenses"));
router.use("/volmon",require("./dash/volmon"));
router.use("/te", require("./dash/te"));


router.get("/network", async (req, res) => {
    res.render("network");
});

router.post("/enlaces", async (req, res) =>{
    var tipos = ["Local", "VRF", "Internet"];
    var data = new Array(3).fill().map((_o, i) => {
        const o = {
            type: tipos[i],
            value: parseFloat((Math.random() * (10)).toFixed(2))
        };
        return o;
    });
    res.json(data);
});

router.post("/timeline", async (_req, res) => {
    const d = new Date();
    const data = new Array(42).fill().map((_o, i) => ({
        date: new Date(d.getFullYear(), d.getMonth(), d.getDate(), i, 0, 0).valueOf(),
        entrada: Math.floor(Math.random() * 40),
        //total: Math.floor(Math.random() * (100 - 60)) + 50,
        salida: Math.floor(Math.random() * 60),
    }));
    res.json(data);
}); 




module.exports = router;
