const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
    res.render("vpn");
});

router.post("/radar", async (_req, res) => {
    const data = ["Nuevo León", "CDMX", "Guadalajara", "Querétaro", "Durango"].map(o => {
        return {
            type: o,
            planned: Math.floor(Math.random() * (40 - 35) + 35),
            actual: Math.floor(Math.random() * (35 - 20) + 20)
        };
    });
    res.json(data);
});

router.post("/licencias", async (_req, res) => {
    const data = ["Ocupadas", "Libres", "Vencidas"].map(o => {
        return {
            type: o,
            actual: Math.floor(Math.random() * (120 - 50) + 50)
        };
    });
    data[1].actual = data[1].actual / 3;
    data[2].actual = data[2].actual / 6;
    res.json(data);
});

router.post("/chartsIds", async (req, res) =>{
    const packets = ["dns_unmatched_msg", "unknown_protocol_2", "DNS_truncated", "bad_HTTP_request", "empty_http_request"];
    const ssls = ["TLS_ECDHE_RSA", "TLS_ECDHE", "TLS_ECDHE_ECDSA", "TLS_RSA", "TLS_ECDSA"];
    const mime = ["application/pkix-cert", "application/xml", "application/soap+xml", "image/gif", "text/html"];
    const top = ["192.168.1.1", "192.168.1.101", "52.54.155.65", "50.16.209.179", "172.217.16.174"];
    var data = new Array(5).fill().map((_o, i) => {
        const o = {
            packet: packets[i],
            ssl: ssls[i],
            mime: mime[i],
            top: top[i],
            value: Math.floor(Math.random() * (50 - 20) + 20),
            value1: Math.floor(Math.random() * (60 - 10) + 10),
            value2: Math.floor(Math.random() * (70 - 30) + 30),
        };
        return o;
    });
    res.json(data);
});

module.exports = router;