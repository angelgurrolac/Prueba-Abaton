const express = require("express");
const router = express.Router();

router.get("/", (_req, res, _next) => {
    res.end("Nothing to see here.");
});

router.post("/services", async (_req, res) => {
    const d = new Date();
    var data = new Array(48).fill().map((_o, i) => {
        const o = {
            date: new Date(
                d.getFullYear(),
                d.getMonth(),
                d.getDate(),
                i,
                0,
                0
            ).valueOf(),
            cpu: Math.floor((Math.random() * (0.1 - 0.3) + 0.3) * 100),
            ram: Math.floor((Math.random() * (0.1 - 0.3) + 0.3) * 30000),
            resptime: Math.floor((Math.random() * (0.1 - 0.3) + 0.3) * 100),
            sqlline: Math.floor((Math.random() * (0.3 - 0.5) + 0.5) * 100),
            sqlline2: Math.floor((Math.random() * (0.3 - 0.5) + 0.5) * 100)
        };
        return o;
    });
    res.json(data);
});

router.post("/circleChart", async (_req, res) => {
    const data = {
        type: {
            types: {
                name: [
                    "Withdrawal",
                    "Interbank transfer",
                    "Same bank payment",
                ],
            },
            faults: {
                name: [
                    "Faulty Dispenser",
                    "Worn Out Card Reades",
                    "Broken Keypad",
                    "Receipt Malfunction",
                    "Software Glitch",
                ],
            },
        },
    };

    data.types=data.type.types.name.map(
        (o) => {
            return {
                type: o,
                planned: Math.floor(Math.random() * 20 + 30),
                actual: Math.floor(Math.random() * 20 + 25),
            };
        }
    );
    data.faults=data.type.faults.name.map(
        (o) => {
            return {
                type: o,
                planned: Math.floor(Math.random() * 20 + 30),
                actual: Math.floor(Math.random() * 20 + 25),
            };
        }
    );


    res.json(data);
});

router.post("/winservices", async (_req, res) => {
    const d = new Date();
    var data = new Array(48).fill().map((_o, i) => {
        const o = {
            date: new Date(
                d.getFullYear(),
                d.getMonth(),
                d.getDate(),
                i,
                0,
                0
            ).valueOf(),
            health: random(Math.floor((Math.random() * (1 - 11) + 11))),
            cpu: Math.floor((Math.random() * (0.1 - 0.3) + 0.3) * 100),
            ram: Math.floor((Math.random() * (0.3 - 0.5) + 0.5) * 100),
            disk: Math.floor((Math.random() * (0.3 - 0.5) + 0.5) * 100)
        };
        return o;
    });
   
    res.json(data);
});

router.post("/azureTraffic", async (_req, res) => {
    const d = new Date();
    var data = new Array(48).fill().map((_o, i) => {
        const o = {
            date: new Date(
                d.getFullYear(),
                d.getMonth(),
                d.getDate(),
                i,
                0,
                0
            ).valueOf(),
            in: Math.floor((Math.random() * (0.1 - 0.3) + 0.3) * 10000000),
            out: Math.floor((Math.random() * (0.3 - 0.5) + 0.5) * 10000000)
        };
        return o;
    });
    res.json(data);
});

function random(number){
   if (number == 1) {
        return 0
   } else {
        return 100
   }
}

router.post("/bar", async (_req, res) => {
    const names = ["Correo","Llamadas","Portal"];
    const data = new Array(3).fill().map((_o, i) => {
        const o = {
            label: names[i],
            actual: Math.floor(Math.random()*(1500-230+1)+230),
            total: Math.floor(Math.random()*(3000-230+1)+230)
        };
        return o;
    });
    res.json(data);
});

router.post("/byseveritylevel", async (_req, res) => {
    const names = ["Severidad 1","Severidad 2","Severidad 3","Severidad 4"];
    const data = new Array(4).fill().map((_o, i) => {
        const o = {
            label: names[i],
            actual: Math.floor(Math.random()*(150-23+1)+23),
            total: Math.floor(Math.random()*(300-23+1)+23)
        };
        return o;
    });
    res.json(data);

});

router.post("/radar", async (_req, res) => {
    const names = ["Desktop","Laptops","Impresoras","Periféricos","Tablets","Smartphones","Otro"];
    const data = new Array(7).fill().map((_o, i) => {
        const o = {
            label: names[i],
            planing: Math.floor(Math.random()*(100-80+1)+80),
            real: Math.floor(Math.random()*(80-50+1)+50)
        };
        return o;
    });
    res.json(data);

});

router.post("/barprotocoll", async (_req, res) => {
    const d = new Date();
    const data = new Array(12).fill().map((_o, i) => {
        const o = {
            label: new Date(
                d.getFullYear(),
                d.getMonth(),
                d.getDate(),
                i,
                0,
                0
            ).valueOf(),
            ssl: Math.floor(Math.random()*(150-23+1)+23),
            http: Math.floor(Math.random()*(300-23+1)+23),
            dns: Math.floor(Math.random()*(350-23+1)+23),
            imap: Math.floor(Math.random()*(450-23+1)+23),
            ssh: Math.floor(Math.random()*(500-23+1)+23)
        };
        return o;
    });
    res.json(data);
});

module.exports = router;
