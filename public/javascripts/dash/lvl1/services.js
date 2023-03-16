function update() {
    cpu();
    setInterval(function () {
        cpu();
    }, 3000);
}


function cpu() {
    $.ajax({
        method: "POST",
        url: "/api/dash/services",
        cache: false,
        success: function (data) {
            $("#avail").text(Math.round(Math.random() * (100 - 80) + 80) + "%");
            $("#resptimeiis").text(Math.round(Math.random() * (70 - 20) + 20));
            $("#resptimeiis").append("<small>ms</small>");
            // ChartLib.palettes.custom = [
            //     "#3e95cd",
            //     "#8e5ea2",
            //     "#3cba9f",
            //     "#e8c3b9",
            //     "#c45850",
            //     "#3e95cd",
            //     "#8e5ea2",
            //     "#3cba9f",
            //     "#e8c3b9",
            //     "#c45850",
            // ];

            ChartLib.palettes.custom = ["#2EBDCB","#EAC23E","#A4DF23","#007DC5","#85BB03","#624034","#F87B1F","#51CBE3","#EAC23E","#F35B34","#D42A37","#9BD6D2"];
            ChartLib.axes.font.size=10;
            ChartLib.line("cpu_line", data, {
                xvalues: "date",
                yvalues: ["cpu"],
                palette: "custom",
                yfmt: "p100",
                display: true,
                axes: true,
            });
            ChartLib.palettes.custom = ["#85BB03"]
            ChartLib.line("ram_line", data, {
                xvalues: "date",
                yvalues: ["ram"],
                palette: "custom",
                yfmt: "p100",
                display: true,
                axes: true,
                yrange: "1",
                fill: ["#85BB03"],
            });
            ChartLib.palettes.custom = ["#6E5C86"];
            ChartLib.line("resp_time", data, {
                xvalues: "date",
                yvalues: ["resptime"],
                palette: "custom",
                yfmt: "p100",
                display: true,
                axes: true,
            });

            const iss = ["200", "302", "404", "500"];
            var n = 800;
            const barData = new Array(4).fill().map((_o, i) => ({
                name: iss[i],
                data: Math.round(
                    Math.random() *
                        ((iss[i] == "200" ? n : (n = n - 200)) - (n - 200)) +
                        (n - 200)
                ),
            }));

            ChartLib.palettes.custom = [
                "#00B050",
                "#558ED5",
                "#FFC000",
                "#FF0000",
            ];
            ChartLib.bar("resp_code", barData, {
                xvalues: "name",
                yvalues: ["data"],
                yfmt: "n",
                display: false,
                palette: "custom",
            });

            ChartLib.palettes.custom = ["#6ECF75"];
            ChartLib.line("sql_line", data, {
                xvalues: "date",
                yvalues: ["sqlline"],
                palette: "custom",
                yfmt: "p100",
                display: true,
                axes: true,
            });

            ChartLib.palettes.custom = ["#6E5C86"];
            ChartLib.line("sql_line2", data, {
                xvalues: "date",
                yvalues: ["sqlline2"],
                palette: "custom",
                yfmt: "p100",
                display: true,
                axes: false,
            });
            stackedHbar("disk_bar");
        },
        error: function (a, b, c) {
            debugger;
        },
    });
}

function stackedHbar(id) {
    const disk = ["C://", "D://"];
    const hbarData = new Array(2).fill().map((_o, i) => ({
        name: disk[i],
        count: [
            Math.round(Math.random() * (800 - 500) + 500),
            Math.round(Math.random() * (800 - 500) + 500),
        ],
    }));
    var barOptions_stacked = {
        responsive: false,
        maintainAspectRatio: true,
        indexAxis: "y",
        tooltips: {
            enabled: false,
        },
        hover: {
            animationDuration: 0,
        },
        scales: {
            x: {
                stacked: true,
                display: false,
            },
            y: {
                stacked: true,
                display: true,
            },
        },
        plugins: {
            legend: {
                display: false,
            },
        },
    };

    if (_charts[id]) {
        _charts[id].data.labels = hbarData.map((o) => o.name);
        _charts[id].data.datasets = [
            {
                data: hbarData[0].count,
                backgroundColor: "#00B050",
            },
            {
                data: hbarData[1].count,
                backgroundColor: "#9BD6D2",
            },
        ];
        _charts[id].update();
    } else {
        var ctx1 = document.getElementById(id);
        _charts[id] = new Chart(ctx1, {
            type: "bar",
            data: {
                labels: hbarData.map((o) => o.name),
                datasets: [
                    {
                        data: hbarData[0].count,
                        backgroundColor: "#00B050",
                    },
                    {
                        data: hbarData[1].count,
                        backgroundColor: "#9BD6D2",
                    },
                ],
            },

            options: barOptions_stacked,
        });
    }
}

function updateChartHistogramContacts() {
    setInterval(chartHistogramContacts, 2000);
}

var chartHistogramContacts1;
function chartHistogramContacts() {
    $.ajax({
        method: "POST",
        url: "/dash/servers/bar",
        cache: false,
        success: function (data) {
            var ctx = document.getElementById("chartHistogramContacts");
            var context = ctx.getContext("2d");
            var color = Chart.helpers.color;
            // Label formatter function
            const formatter = (value, ctx) => {
                const otherDatasetIndex = ctx.datasetIndex === 0 ? 1 : 0;
                const total =
                    ctx.chart.data.datasets[otherDatasetIndex].data[
                        ctx.dataIndex
                    ] + value;

                return `${((value / total) * 100).toFixed(0)}%`;
            };
            if (chartHistogramContacts1) {
                chartHistogramContacts1.data.datasets[0].data = data.map(
                    function (o) {
                        return o.actual;
                    }
                );
                chartHistogramContacts1.data.datasets[1].data = data.map(
                    function (o) {
                        return o.total;
                    }
                );
                chartHistogramContacts1.update();
            } else {
                chartHistogramContacts1 = new Chart(ctx, {
                    type: "bar",
                    data: {
                        labels: data.map(function (o) {
                            return o.label;
                        }),
                        datasets: [
                            {
                                data: data.map(function (o) {
                                    return o.actual;
                                }),
                                label: "Resueltos",
                                backgroundColor: color("#00B050")
                                    .alpha(0.7)
                                    .rgbString(),
                                borderColor: "#00B050",
                                weight: 3,
                                borderWidth: 1,
                                datalabels: {
                                    color: "black",
                                    formatter: formatter,
                                },
                            },
                            {
                                data: data.map(function (o) {
                                    return o.total;
                                }),
                                label: "Total",
                                backgroundColor: color("#9BD6D2")
                                    .alpha(0.7)
                                    .rgbString(),
                                borderColor: "#9BD6D2",
                                weight: 3,
                                borderWidth: 1,
                                datalabels: {
                                    color: "black",
                                    formatter: formatter,
                                },
                            },
                            {
                                data: data.map(function (o) {
                                    return o.total;
                                }),
                                label: "Total",
                                backgroundColor: color("#2598C9")
                                    .alpha(0.7)
                                    .rgbString(),
                                borderColor: "#2598C9",
                                weight: 3,
                                borderWidth: 1,
                                datalabels: {
                                    color: "black",
                                    formatter: formatter,
                                },
                            },
                        ],
                    },
                    options: {
                        animation: {
                            duration: 3000,
                        },
                        spanGaps: false,
                        legend: {
                            display: false,
                        },
                        tooltips: {
                            mode: "label",
                            callbacks: {
                                label: function (tooltipItem, data) {
                                    const type =
                                        data.datasets[tooltipItem.datasetIndex]
                                            .label;
                                    const value =
                                        data.datasets[tooltipItem.datasetIndex]
                                            .data[tooltipItem.index];
                                    let total = 0;
                                    for (
                                        let i = 0;
                                        i < data.datasets.length;
                                        i++
                                    )
                                        total +=
                                            data.datasets[i].data[
                                                tooltipItem.index
                                            ];
                                    if (
                                        tooltipItem.datasetIndex !==
                                        data.datasets.length - 1
                                    ) {
                                        return (
                                            type +
                                            " : " +
                                            value
                                                .toFixed(0)
                                                .replace(
                                                    /(\d)(?=(\d{3})+\.)/g,
                                                    "1,"
                                                )
                                        );
                                    } else {
                                        return [
                                            type +
                                                " : " +
                                                value
                                                    .toFixed(0)
                                                    .replace(
                                                        /(\d)(?=(\d{3})+\.)/g,
                                                        "1,"
                                                    ),
                                            "Total : " + total,
                                        ];
                                    }
                                },
                            },
                        },
                        plugins: {
                            legend: {
                                display: false,
                            },
                            // Change options for ALL labels of THIS CHART
                            datalabels: {
                                color: "#ffffff",
                                align: "center",
                                font: {
                                    weight: "bold",
                                },
                            },
                        },
                        scales: {
                            yAxis: {
                                stacked: true,
                                scaleLabel: {
                                    display: true,
                                },
                                ticks: {
                                    fontColor: "#ffffff",
                                    fontSize: 10,
                                    callback: function (data) {
                                        return data.toLocaleString("en-US");
                                    },
                                },
                            },
                            xAxis: {
                                stacked: true,
                                gridLines: {
                                    display: false,
                                },
                                ticks: {
                                    fontColor: "#ffffff",
                                    fontSize: 10,
                                    maxRotation: 0,
                                    autoSkip: true,
                                    autoSkipPadding: 8,
                                },
                            },
                        },
                    },
                });
            }
        },
        error: function (a, b, c) {
            debugger;
        },
    });
}
