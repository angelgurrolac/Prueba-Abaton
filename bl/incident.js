const moment = require("moment");
const self = exports;

exports.data = async () => {
    const setPercentMetric = data =>
    Object.assign(data, {
        metric: data.good / (data.good + data.bad)
    });
   
    const sla = [
        setPercentMetric({
            legend: "En tiempo",
            good: Math.random() * (3500 - 2500) + 2500,
            bad: Math.random() * (500 - 100) + 100,
            gooddelta: +(Math.random() * (0.25 - 0.10) + 0.10),
            baddelta: -(Math.random() * (0.25 - 0.10) + 0.10)
        })
    ];

    const calls = [
        {
            legend: "Entrantes",
            metric: Math.random() * (6000 - 4500) + 4500,
            delta: +(Math.random() * (0.20 - 0.10) + 0.10)
        },
        {
            legend: "Abandonadas",
            metric: Math.random() * (250 - 200) + 200,
            delta: -(Math.random() * (0.15 - 0.05) + 0.05)
        },
        {
            legend: "1er contacto",
            metric: Math.random() * (1000 - 800) + 800,
            delta: +(Math.random() * (0.25 - 0.10) + 0.10)
        },
        {
            legend: "Mayores a 20 seg.",
            metric: Math.random() * (150 - 100) + 100,
            delta: +(Math.random() * (0.25 - 0.10) + 0.10)
        }
    ];

    const incidents = {
        closed: [
            setPercentMetric({
                legend: "Base de datos",
                good: Math.random() * (500 - 150) + 150,
                bad: Math.random() * (20 - 10) + 10,
                gooddelta: -(Math.random() * (0.25 - 0.02) + 0.02),
                baddelta: +(Math.random() * (0.25 - 0.10) + 0.10)
            }),
            setPercentMetric({
                legend: "Control de accesos",
                good: Math.random() * (400 - 100) + 100,
                bad: Math.random() * (30 - 10) + 10,
                gooddelta: -(Math.random() * (0.25 - 0.02) + 0.02),
                baddelta: +(Math.random() * (0.45 - 0.10) + 0.10)
            }),
            setPercentMetric({
                legend: "Correo",
                good: Math.random() * (3000 - 2700) + 2700,
                bad: Math.random() * (50 - 10) + 10,
                gooddelta: +(Math.random() * (0.25 - 0.10) + 0.10),
                baddelta: -(Math.random() * (0.25 - 0.10) + 0.10)
            })
        ]
    };
    const incidentsSite = [{
        legend: "Resueltos en sitio",
        metric: Math.random() * (700 - 500) + 500,
        delta: +(Math.random() * (0.40 - 0.10) + 0.10)

    }]
    const incidentsDocumented = [
        {
            legend: "Documentados",
            metric: Math.random() * (4000 - 3500) + 3500,
            delta: +(Math.random() * (0.25 - 0.10) + 0.10)
        },
        {
            legend: "Sin documentar",
            metric: Math.random() * (1000 - 800) + 800,
            delta: -(Math.random() * (0.25 - 0.02) + 0.02)
        }
    ];

    const incidentsDay = [
        setPercentMetric({
            legend: "Incidentes",
            good: Math.random() * (5000 - 4800) + 4800,
            bad: Math.random() * (1000 - 900) + 900,
            gooddelta: +(Math.random() * (0.25 - 0.02) + 0.02),
            baddelta: -(Math.random() * (0.25 - 0.02) + 0.02)
        })
    ];

    const incidentsReassigned = [
        {
            legend: "Total",
            metric: Math.random() * (1000 - 100) + 100,
            delta: +(Math.random() * (0.25 - 0.02) + 0.02)
        },
        {
            legend: "Mal clasificados",
            metric: Math.random() * (1000 - 100) + 100,
            delta: +(Math.random() * (0.25 - 0.02) + 0.02)
        },
        {
            legend: "Devuelto por resolutor",
            metric: Math.random() * (100 - 10) + 10,
            delta: +(Math.random() * (0.25 - 0.02) + 0.02)
        }
    ];
    const agents = [
        {   
            min: false,
            legend: "Atendiendo",
            metric: Math.random() * (50 - 10) + 10,
            delta: +(Math.random() * (0.25 - 0.02) + 0.02)
        },
        {
            min: false,
            legend: "1er contacto",
            metric: Math.random() * (10 - 1) + 1,
            delta: +(Math.random() * (0.25 - 0.02) + 0.02)
        },
        {
            min: true,
            legend: "Tiempo de atención",
            metric: Math.random() * (7 - 2) + 2,
            delta: +(Math.random() * (0.25 - 0.02) + 0.02)
        }
    ];

    const data = {
        sla,
        calls,
        incidents,        
        incidentsDocumented,
        incidentsSite,
        incidentsDay,
        incidentsReassigned,
        agents
    };

    return data;
};

