const express = require("express");
const router = express.Router();
const bl = require("../../bl");

router.get("/", async (req, res) => {
    const data = await bl.ap.data();
    res.render("ap", { _estados, _edificios, data  });
});

router.get("/data", async (req, res) => {
    const data = {
        data: new Array(50).fill().map((o, i) => {
            const f = Math.floor(Math.random() * 3) + 1;
            const n = (f & 1 ? 1 : 0) + (f & 2 ? 1 : 0);
            return {
                id: i + 1,
                name: randAP(),
                frequency: randFrequencyArray(f),
                ram_used: randPercentArray(n),
                cpu_used: randPercentArray(n),
                radio_used: randPercentArray(n)
            };
        })
    };
    res.json(data);
});


router.post("/", async (req, res) => {
    const ap = "";
    res.json({ ap });
});


var _edificios = [
    {
        ID: 1,
        Name: "CR-720"
    },
    {
        ID: 2,
        Name: "CR-3743"
    },
    {
        ID: 3,
        Name: "Custodia_Documentos"
    },
    {
        ID: 4,
        Name: "TORRE KOI"
    }
];
var _estados = [
    {
        ID: 1,
        Name: "Aguascalientes"
    },
    {
        ID: 2,
        Name: "Baja California"
    },
    {
        ID: 3,
        Name: "Baja California Sur"
    },
    {
        ID: 4,
        Name: "Campeche"
    },
    {
        ID: 5,
        Name: "Chiapas"
    },
    {
        ID: 6,
        Name: "Chihuahua"
    },
    {
        ID: 7,
        Name: "Coahuila de Zaragoza"
    },
    {
        ID: 8,
        Name: "Colima"
    },
    {
        ID: 9,
        Name: "Ciudad de México"
    },
    {
        ID: 10,
        Name: "Durango"
    },
    {
        ID: 11,
        Name: "Guanajuato"
    },
    {
        ID: 12,
        Name: "Guerrero"
    },
    {
        ID: 13,
        Name: "Hidalgo"
    },
    {
        ID: 14,
        Name: "Jalisco"
    },
    {
        ID: 15,
        Name: "Estado de Mexico"
    },
    {
        ID: 16,
        Name: "Michoacan de Ocampo"
    },
    {
        ID: 17,
        Name: "Morelos"
    },
    {
        ID: 18,
        Name: "Nayarit"
    },
    {
        ID: 19,
        Name: "Nuevo Leon"
    },
    {
        ID: 20,
        Name: "Oaxaca"
    },
    {
        ID: 21,
        Name: "Puebla"
    },
    {
        ID: 22,
        Name: "Queretaro de Arteaga"
    },
    {
        ID: 23,
        Name: "Quintana Roo"
    },
    {
        ID: 24,
        Name: "San Luis Potosi"
    },
    {
        ID: 25,
        Name: "Sinaloa"
    },
    {
        ID: 26,
        Name: "Sonora"
    },
    {
        ID: 27,
        Name: "Tabasco"
    },
    {
        ID: 28,
        Name: "Tamaulipas"
    },
    {
        ID: 29,
        Name: "Tlaxcala"
    },
    {
        ID: 30,
        Name: "Veracruz de Ignacio de la Llave"
    },
    {
        ID: 31,
        Name: "Yucatan"
    },
    {
        ID: 32,
        Name: "Zacatecas"
    }
];

const _ap = [
    "AP_COMEDOR_1",
    "AP_COMEDOR_2",
    "AP_E4_1_KOI",
    "Business-Center_KOI_P5_1",
    "Business-Center_KOI_P5_10",
    "Business-Center_KOI_P5_11",
    "Business-Center_KOI_P5_12",
    "Business-Center_KOI_P5_13",
    "Business-Center_KOI_P5_14",
    "Business-Center_KOI_P5_15",
    "Business-Center_KOI_P5_2",
    "Business-Center_KOI_P5_3",
    "Business-Center_KOI_P5_4",
    "Business-Center_KOI_P5_5",
    "Business-Center_KOI_P5_6",
    "Business-Center_KOI_P5_7",
    "Business-Center_KOI_P5_8",
    "Business-Center_KOI_P5_9",
    "Business-Center_KOI_P6_1",
    "Business-Center_KOI_P6_10",
    "Business-Center_KOI_P6_11",
    "Business-Center_KOI_P6_12",
    "Business-Center_KOI_P6_13",
    "Business-Center_KOI_P6_14",
    "Business-Center_KOI_P6_2",
    "Business-Center_KOI_P6_3",
    "Business-Center_KOI_P6_4",
    "Business-Center_KOI_P6_5",
    "Business-Center_KOI_P6_6",
    "Business-Center_KOI_P6_7",
    "Business-Center_KOI_P6_8",
    "Business-Center_KOI_P6_9",
    "TORRE_KOI_PISO10-1",
    "TORRE_KOI_PISO10_3",
    "TORRE_KOI_PISO10_4",
    "TORRE_KOI_PISO10_5",
    "TORRE_KOI_PISO10_6",
    "TORRE_KOI_PISO10_7",
    "TORRE_KOI_PISO11_2",
    "TORRE_KOI_PISO11_3",
    "TORRE_KOI_PISO11_4",
    "TORRE_KOI_PISO11_5",
    "TORRE_KOI_PISO11_6",
    "TORRE_KOI_PISO11_7",
    "TORRE_KOI_PISO12_1",
    "TORRE_KOI_PISO12_2",
    "TORRE_KOI_PISO12_3",
    "TORRE_KOI_PISO12_4",
    "TORRE_KOI_PISO12_5",
    "TORRE_KOI_PISO12_6",
    "TORRE_KOI_PISO12_7",
    "TORRE_KOI_PISO14-1",
    "TORRE_KOI_PISO14_2",
    "TORRE_KOI_PISO14_3",
    "TORRE_KOI_PISO14_4",
    "TORRE_KOI_PISO14_6",
    "TORRE_KOI_PISO14_7",
    "TORRE_KOI_PISO14_Barraza",
    "TORRE_KOI_PISO15_1",
    "TORRE_KOI_PISO15_2",
    "TORRE_KOI_PISO15_3",
    "TORRE_KOI_PISO15_4",
    "TORRE_KOI_PISO15_5",
    "TORRE_KOI_PISO15_6",
    "TORRE_KOI_PISO15_7",
    "TORRE_KOI_PISO15_8",
    "TORRE_KOI_PISO16_1",
    "TORRE_KOI_PISO16_2",
    "TORRE_KOI_PISO16_3",
    "TORRE_KOI_PISO16_4",
    "TORRE_KOI_PISO16_5",
    "TORRE_KOI_PISO16_6",
    "TORRE_KOI_PISO16_7",
    "TORRE_KOI_PISO4_1",
    "TORRE_KOI_PISO4_2",
    "TORRE_KOI_PISO4_3",
    "TORRE_KOI_PISO4_4",
    "TORRE_KOI_PISO4_5",
    "TORRE_KOI_PISO4_6",
    "TORRE_KOI_PISO6_7",
    "TORRE_KOI_PISO7-3",
    "TORRE_KOI_PISO7_1",
    "TORRE_KOI_PISO7_2",
    "TORRE_KOI_PISO7_4",
    "TORRE_KOI_PISO7_5",
    "TORRE_KOI_PISO7_6",
    "TORRE_KOI_PISO8_1",
    "TORRE_KOI_PISO8_2",
    "TORRE_KOI_PISO8_3",
    "TORRE_KOI_PISO8_5",
    "TORRE_KOI_PISO8_6",
    "TORRE_KOI_PISO8_7",
    "TORRE_KOI_PISO9_1",
    "TORRE_KOI_PISO9_2",
    "TORRE_KOI_PISO9_3",
    "TORRE_KOI_PISO9_4",
    "TORRE_KOI_PISO9_7",
    "TORRE_KOI_PISO_11-2",
    "TORRE_KOI_PISO_11_1",
    "TORRE_KOI_PISO_14_5",
    "TORRE_KOI_PISO_7_7",
    "TORRE_KOI_PISO_8-4",
    "TORRE_KOI_PISO_9-5",
    "TORRE_KOI_PISO_9_6"
];

function randAP() {
    return _ap[Math.floor(Math.random() * _ap.length)];
}

function randNum() {
    return Math.floor(Math.random() * 10) + 1;
}

function randFrequencyArray(f) {
    return ["2.4 MHz", "5.0 MHz"].filter((_, i) => f & (i + 1));
}

function randPercentArray(n) {
    return new Array(n).fill().map(o => Math.random());
}

module.exports = router;
