var chartequipos1;
function updatewireless() {
    wireless();
    setInterval(wireless, 10000);
}

function wireless() {
    if ($("#wireless_health").length) {
        ChartLib.circle("wireless_health", Math.random() * (100 - 90) + 90, {
            mode: "continuous",
            fontSize: 16,
        });
    }
    if ($("#ap_health").length) {
        ChartLib.circle("ap_health", Math.random() * (100 - 90) + 90, {
            mode: "continuous",
            fontSize: 16,
        });
    }
    const data = ["GFNORTE", "BYOD", "GFBA", "INVITADOS", "OTHERS"].map(
        (o) => ({
            name: o,
            count: Math.floor(Math.random() * (100 - 20) + 20),
        })
    );

    if ($("#clientesid").length) {
        ChartLib.palettes.custom = [
            "#4D8FD6",
            "#D77420",
            "#B769E9",
            "#E7537F",
            "#27CBB9",
        ];
        const total = data.reduce(
            (sum, value) =>
                typeof value.count == "number" ? sum + value.count : sum,
            0
        );
        $("#clientesidactual").html("");
        for (let i = 0; i < data.length; i++) {
            $("#clientesidactual").append(
                "<div class='rectangle' style='background-color:" +
                    ChartLib.palettes.custom[i] +
                    ";'>" +
                    "</div>" +
                    "<h5 class='m-0'>" +
                    data[i].name +
                    "&nbsp;</h5><h3 class='m-0'>" +
                    ((data[i].count * 100) / total).toFixed(2) +
                    "%</h3>" +
                    "<br>"
            );
        }
        ChartLib.doughnut("clientesid", data, {
            xvalues: "name",
            yvalues: ["count"],
            yfmt: "n",
            legend: false,
            palette: "custom",
            responsive: true,
            value: 100,
        });
    }

    const data2 = ["2.5 GHz", "5 GHz"].map((o) => ({
        name: o,
        count: Math.floor(Math.random() * (3658 - 1750) + 1750),
    }));

    if ($("#clientesb").length) {
        ChartLib.palettes.custom = ["#00B24C", "#753192"];
        const total = data2.reduce(
            (sum, value) =>
                typeof value.count == "number" ? sum + value.count : sum,
            0
        );
        $("#clientesbactual").html("");
        for (let i = 0; i < data2.length; i++) {
            $("#clientesbactual").append(
                "<div class='rectangle' style='background-color:" +
                    ChartLib.palettes.custom[i] +
                    ";'>" +
                    "</div>" +
                    "<h5 class='m-0'>" +
                    data2[i].name +
                    "&nbsp;</h5><h3 class='m-0'>" +
                    ((data2[i].count * 100) / total).toFixed(2) +
                    "%</h3>" +
                    "<br>"
            );
        }
        ChartLib.doughnut("clientesb", data2, {
            xvalues: "name",
            yvalues: ["count"],
            yfmt: "n",
            legend: false,
            responsive: true,
            palette: "custom",
        });
    }

    if ($("#chart").length) {
        var ctx = document.getElementById("chart").getContext("2d");

        var colors = {
        activeclients: "white",
        onboarded: "white",
        notonboarded: "#D7472E",
        good: "#16B25F",
        fairCon: "#FCA517",
        other: "white",
        dhcp: "#D7472E",
        authentication:"#D7472E",
        association:"white"
        };

        // the y-order of nodes, smaller = higher
        var priority = {
        activeclients: 1,
        notonboarded: 2,
        onboarded: 2,
        good: 3,
        fairCon: 3,
        other: 3,
        dhcp: 3,
        authentication:3,
        association:3
        };
       
        function getColor(name) {
        return colors[name] || "green";
        }

        var chart = new Chart(ctx, {
        type: "sankey",
        data: {
            datasets: [
            {
                data: [
                { from: "activeclients", to: "notonboarded", flow: 527 },
                { from: "activeclients", to: "onboarded", flow: 4069},
                { from: "notonboarded", to: "other", flow: 30 },
                { from: "notonboarded", to: "dhcp", flow: 350 },
                { from: "notonboarded", to: "authentication", flow: 100 },
                { from: "notonboarded", to: "association", flow: 47 },
                { from: "onboarded", to: "fairCon", flow: 24 },
                { from: "onboarded", to: "good", flow: 4045 }
                ],
                priority,
                colorFrom: (c) => getColor(c.dataset.data[c.dataIndex].from),
                colorTo: (c) => getColor(c.dataset.data[c.dataIndex].to),
                borderWidth: 2,
                borderColor: 'black'
            }
            ]
        },
        options: {
            responsive:true,
            maintainAspectRatio: false,
            animation: {
                duration: 3000,
            },
        },
        });

    }

    
    if ($("#apred").length) {
        const d = new Date();
        const datared = new Array(24).fill().map((_o, i) => ({
            date: new Date(d.getFullYear(), d.getMonth(), d.getDate(), i, 0, 0).valueOf(),
            actual: Math.floor(Math.random() * (50 - 10 + 1) + 10)
        }));

        ChartLib.line("apredchart", datared, {
            xvalues: "date",
            yvalues: ["actual"],
            color: ["#D7472E"],
            responsive: true,
            display: true
        });
        
    }
    if ($("#apyellowchart").length) {
        const d = new Date();
        const datared = new Array(24).fill().map((_o, i) => ({
            date: new Date(d.getFullYear(), d.getMonth(), d.getDate(), i, 0, 0).valueOf(),
            actual: Math.floor(Math.random() * (50 - 10 + 1) + 10)
        }));

        ChartLib.line("apyellowchart", datared, {
            xvalues: "date",
            yvalues: ["actual"],
            color: ["#FF8E0E"],
            responsive: true,
            display: true
        });
    }

    if ($("#visitsday").length) {
        const d = new Date();
        const datav = new Array(24).fill().map((_o, i) => ({
            date: new Date(d.getFullYear(), d.getMonth(), d.getDate(), i, 0, 0).valueOf(),
            actual: Math.floor(Math.random() * (50 - 10 + 1) + 10)
        }));
        ChartLib.palettes.custom = ["#FF7070"];
        ChartLib.bar("visitsday", datav, {
            xvalues: "date",
            yvalues: ["actual"],
            palette: "custom",
            xfmt: "dHm",
            display: true
        });
    }

    if ($("#visitsweek").length) {
        const d = new Date();
        const dataw = new Array(7).fill().map((_o, i) => ({
            date: new Date(d.getFullYear(), d.getMonth(), d.getDay(), i, 0, 0).valueOf(),
            actual: Math.floor(Math.random() * (50 - 10 + 1) + 10)
        }));
        ChartLib.palettes.custom = ["#FF7070"];
        ChartLib.bar("visitsweek", dataw, {
            xvalues: "date",
            yvalues: ["actual"],
            palette: "custom",
            xfmt: "dHm",
            display: true
        });
    }

    if ($("#chart2").length) {
        var equipos = document.getElementById("chart2");
        const formatter = (value, equipos) => {
            const otherDatasetIndex = equipos.datasetIndex === 0 ? 1 : 0;
            const total = equipos.chart.data.datasets[otherDatasetIndex].data[equipos.dataIndex] + value;
            return `${((value / total) * 100).toFixed(0)}%`;
        };
        var datas = [
            {
                "type": "Active clients",
                "verde": 4600,
                "amarillo": 0,
                "rojo": 0,
                "total": 0
            },
            {
                "type": "OnBoarded",
                "verde": 4069,
                "amarillo": 527,
                "rojo": 0,
                "total": 0
            },
            {
                "type": "Good Conectivity",
                "verde": 3864,
                "amarillo": 230,
                "rojo": 431,
                "total": 0
            }
        ]
        
        if (chartequipos1) {
            
            chartequipos1.data.datasets[0].data = datas.map(function (o) {
                return o.verde;
            });
            chartequipos1.data.datasets[1].data = datas.map(function (o) {
                return o.amarillo;
            });
            chartequipos1.data.datasets[2].data = datas.map(function (o) {
                return o.rojo;
            });
            chartequipos1.update();
        } else {
            chartequipos1 = new Chart(equipos, {
                type: "bar",
                data: {
                    labels: datas.map(function (o) {
                    return o.type;
                }),
                datasets: [
                {
                    data: datas.map(function (o) {
                        return o.verde;
                    }),
                    label: "",
                    backgroundColor: "#FFFFFF",
                    borderColor: "#000000",
                    weight: 3,
                    borderWidth: 1,
                    datalabels: {
                    color: "white",
                    formatter: formatter,
                    },
                },
                {
                    data: datas.map(function (o) {
                    return o.amarillo;
                    }),
                    label: "",
                    backgroundColor: "#D7472E",
                    borderColor: "#000000",
                    weight: 3,
                    borderWidth: 1,
                    datalabels: {
                    color: "white",
                    formatter: formatter,
                    },
                },
                {
                    data: datas.map(function (o) {
                    return o.rojo;
                    }),
                    label: "",
                    backgroundColor: "#FCA517",
                    borderColor: "#000000",
                    weight: 3,
                    borderWidth: 1,
                    datalabels: {
                    color: "white",
                    formatter: formatter,
                    },
                },
                ],
            },
            options: {
                responsive:true,
                maintainAspectRatio: false,
                animation: {
                duration: 3000,
                },
                spanGaps: false,
                legend: {
                display: false,
                },
                tooltips: {
                display: false,
                },
                plugins: {
                // Change options for ALL labels of THIS CHART
                datalabels: {
                    color: "#000000",
                    align: "center",
                    font: { family: "Open Sans", size: 10, color: "#eeeeee" },
                },
                },
                scales: {
                yAxes: [
                    {
                    stacked: true,
                    scaleLabel: {
                        display: true,
                    },
                    ticks: {
                        fontColor: "#000000",
                        fontSize: 10,
                    },
                    },
                ],
                xAxes: [
                    {
                    stacked: true,
                    gridLines: {
                        display: true,
                    },
                    ticks: {
                        fontColor: "#000000",
                        fontSize: 10,
                        maxRotation: 0,
                        autoSkip: true,
                        autoSkipPadding: 8,
                    },
                    },
                ],
                },
            },
            });
        }
    }
   

    $(".updatetext").text("Última actualización: " + fmt("dDMYHMs")(moment()));
}


$(document).ready(function () {
    $('#build').on('change', function() {
        var city = document.getElementById("city");
        window.open("/dash/menu/city/" + city.value + "/" + this.value,"_self");
    });
    
});