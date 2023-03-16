const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
    res.render("dash/servers/servers");
});
router.get("/win", function (req, res) {
    const cust = req.params.cust;
    res.render("dash/servers/healthcustwin", { cust });
});

router.get("/sql", function (req, res) {
    const cust = req.params.cust;
    res.render("dash/servers/healthcustsql", { cust });
});

router.get("/iis", function (req, res) {
    const cust = req.params.cust;
    res.render("dash/servers/healthcustiis", { cust });
});
router.get("/vmware", function (req, res) {
    const cust = req.params.cust;
    res.render("dash/servers/healthcustvmware", { cust });
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

router.post("/timeline2", async (_req, res) => {
    const d = new Date();
    const data = new Array(42).fill().map((_o, i) => ({
        date: new Date(d.getFullYear(), d.getMonth(), d.getDate(), i, 0, 0).valueOf(),
        usado: Math.floor(Math.random() * 40),
        ram: Math.floor(Math.random() * 20),
        disk: Math.floor(Math.random() * 30),
        total1: Math.floor(Math.random() * (100 - 60)) + 50,
        total2: Math.floor(Math.random() * (100 - 80)) + 50,
        total3: Math.floor(Math.random() * (100 - 70)) + 50,
        //total: Math.floor(Math.random() * 60),
        cpu: Math.floor(Math.random() * 60), 
    }));
    res.json(data);
}); 

router.post("/datos", async (_req, res) =>{
    var tipos = ["NFS", "VMFS", "Total"];
    var data = new Array(3).fill().map((_o, i) => {
        const o = {
            type: tipos[i],
            value: Math.floor(Math.random() * (50 - 10)) + 10
        };
        return o;
    });
    res.json(data);
});

router.post("/bar", async (_req, res) => {
     const names = ["CPU","Memoria","Disco"];
     const data = new Array(3).fill().map((_o, i) => {
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
