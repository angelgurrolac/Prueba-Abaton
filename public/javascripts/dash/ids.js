function updateChartHistogramIds() {
    setInterval(chartHistogramProtocoll, 4000);
}

var chartHistogramProtcoll1;
function chartHistogramProtocoll() {
    $.ajax({
        method: "POST",
        url: "/api/dash/barprotocoll",
        cache: false,
        success: function (data) {
            var ctx = document.getElementById("chartHistogramProtocoll");
            var context = ctx.getContext("2d");
            var color = Chart.helpers.color;
            // Label formatter function
            const formatter = (value, ctx) => {
                const otherDatasetIndex = ctx.datasetIndex === 0 ? 1 : 0;
                const total = ctx.chart.data.datasets[otherDatasetIndex].data[ctx.dataIndex] + value;

                return `${((value / total) * 100).toFixed(0)}%`;
            };
            if (chartHistogramProtcoll1) {
                chartHistogramProtcoll1.data.datasets[0].data = data.map(function (o) {
                    return o.ssl;
                });
                chartHistogramProtcoll1.data.datasets[1].data = data.map(function (o) {
                    return o.http;
                });
                chartHistogramProtcoll1.data.datasets[2].data = data.map(function (o) {
                    return o.dns;
                });
                chartHistogramProtcoll1.data.datasets[3].data = data.map(function (o) {
                    return o.imap;
                });
                chartHistogramProtcoll1.data.datasets[4].data = data.map(function (o) {
                    return o.ssh;
                });
                chartHistogramProtcoll1.update();
            } else {
                chartHistogramProtcoll1 = new Chart(ctx, {
                    type: "bar",
                    data: {
                        labels: data.map(function (o) {
                            return o.label;
                        }),
                        datasets: [
                            {
                                data: data.map(function (o) {
                                    return o.ssl;
                                }),
                                label: "SSL",
                                backgroundColor: color("#283593").alpha(0.7).rgbString(),
                                borderColor: "#283593",
                                weight: 3,
                                borderWidth: 1,
                                datalabels: {
                                    color: "black",
                                    formatter: formatter
                                }
                            },
                            {
                                data: data.map(function (o) {
                                    return o.http;
                                }),
                                label: "HTTP",
                                backgroundColor: color("#0277BD").alpha(0.7).rgbString(),
                                borderColor: "#0277BD",
                                weight: 3,
                                borderWidth: 1,
                                datalabels: {
                                    color: "black",
                                    formatter: formatter
                                }
                            },
                            {
                                data: data.map(function (o) {
                                    return o.dns;
                                }),
                                label: "DNS",
                                backgroundColor: color("#00695C").alpha(0.7).rgbString(),
                                borderColor: "#00695C",
                                weight: 3,
                                borderWidth: 1,
                                datalabels: {
                                    color: "black",
                                    formatter: formatter
                                }
                            },
                            {
                                data: data.map(function (o) {
                                    return o.imap;
                                }),
                                label: "IMAP,SSL",
                                backgroundColor: color("#F9A825").alpha(0.7).rgbString(),
                                borderColor: "#F9A825",
                                weight: 3,
                                borderWidth: 1,
                                datalabels: {
                                    color: "black",
                                    formatter: formatter
                                }
                            },
                            {
                                data: data.map(function (o) {
                                    return o.ssh;
                                }),
                                label: "SSH",
                                backgroundColor: color("#9C27B0").alpha(0.7).rgbString(),
                                borderColor: "#9C27B0",
                                weight: 3,
                                borderWidth: 1,
                                datalabels: {
                                    color: "black",
                                    formatter: formatter
                                }
                            }
                        ]
                    },
                    options: {
                        animation: {
                            duration: 3000
                        },
                        spanGaps: false,
                        legend: {
                            display: false
                        },
                        tooltips: {
                            mode: "label",
                            callbacks: {
                                label: function (tooltipItem, data) {
                                    const type = data.datasets[tooltipItem.datasetIndex].label;
                                    const value = data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];
                                    let total = 0;
                                    for (let i = 0; i < data.datasets.length; i++)
                                        total += data.datasets[i].data[tooltipItem.index];
                                    if (tooltipItem.datasetIndex !== data.datasets.length - 1) {
                                        return type + " : " + value.toFixed(0).replace(/(\d)(?=(\d{3})+\.)/g, "1,");
                                    } else {
                                        return [
                                            type + " : " + value.toFixed(0).replace(/(\d)(?=(\d{3})+\.)/g, "1,"),
                                            "Total : " + total
                                        ];
                                    }
                                }
                            }
                        },
                        plugins: {
                            legend: {
                                display: false
                            },
                            // Change options for ALL labels of THIS CHART
                            datalabels: {
                                color: "#ffffff",
                                align: "center",
                                font: {
                                    weight: "bold"
                                }
                            }
                        },
                        scales: {
                            y: {
                                stacked: true,
                                scaleLabel: {
                                    display: true
                                },
                                ticks: {
                                    fontColor: "#ffffff",
                                    fontSize: 10,
                                    callback: function (data) {
                                        return data.toLocaleString("en-US");
                                    }
                                }
                            },
                            x: {
                                stacked: true,
                                gridLines: {
                                    display: false
                                },
                                ticks: {
                                    fontColor: "#ffffff",
                                    fontSize: 10,
                                    maxRotation: 0,
                                    autoSkip: true,
                                    autoSkipPadding: 8,
                                    callback: function (i) {
                                        return moment(data[i].label).format("HH:mm");
                                    }
                                }
                            }
                        }
                    }
                });
            }
        },
        error: function (a, b, c) {
            debugger;
        }
    });
}

function update() {
    charts();
    setInterval(function () {
        charts();
    }, 30000);
}

function charts() {
    var datalogs = [
        {
            fecha: "19-08-2022 14:32:36",
            id_ori_h: "192.168.1.101",
            id_ori_p: "51,370",
            duracion: "1,499.55",
            id_resp_h: "52.44.245.252",
            id_resp_p: "443",
            servicio: "ssl"
        },
        {
            fecha: "19-08-2022 14:32:36",
            id_ori_h: "192.168.1.101",
            id_ori_p: "49,370",
            duracion: "967",
            id_resp_h: "172.217.22.106",
            id_resp_p: "443",
            servicio: "-"
        },
        {
            fecha: "20-08-2022 09:25:36",
            id_ori_h: "192.168.1.101",
            id_ori_p: "49,552",
            duracion: "898.884",
            id_resp_h: "81.169.145.103",
            id_resp_p: "143",
            servicio: "ssl"
        },
        {
            fecha: "20-08-2022 10:32:36",
            id_ori_h: "192.168.1.101",
            id_ori_p: "49,552",
            duracion: "884",
            id_resp_h: "151.101.112.84",
            id_resp_p: "443",
            servicio: "ssl"
        },
        {
            fecha: "20-08-2022 11:05:00",
            id_ori_h: "192.168.1.101",
            id_ori_p: "49,552",
            duracion: "610.25",
            id_resp_h: "151.101.113.130",
            id_resp_p: "443",
            servicio: "ssl"
        },
        {
            fecha: "20-08-2022 12:32:36",
            id_ori_h: "192.168.1.101",
            id_ori_p: "49,552",
            duracion: "609.82",
            id_resp_h: "151.101.112.102",
            id_resp_p: "143",
            servicio: "-"
        },
        {
            fecha: "19-08-2022 14:32:36",
            id_ori_h: "192.168.1.101",
            id_ori_p: "49,552",
            duracion: "898.884",
            id_resp_h: "212.121.137.214",
            id_resp_p: "143",
            servicio: "-"
        }
    ];

    makeTable("logs", datalogs);

    $.ajax({
        method: "POST",
        url: "/dash/vpn/chartsIds",
        cache: false,
        success: function (data) {
            ChartLib.palettes.custom = ["#FFAB91", "#F48FB1", "#90CAF9", "#A5D6A7", "#FFE082"];
            $("#data_wp").html("");
            for (let i = 0; i < data.length; i++) {
                $("#data_wp").append(
                    "<div class='bullet' style='background-color:" +
                        ChartLib.palettes.custom[i] +
                        ";'>" +
                        "</div>" +
                        "<h5>" +
                        data[i].packet +
                        "&nbsp;&nbsp;</h5><h3>" +
                        Math.round(data[i].value) +
                        "</h3>" +
                        "<h5>" +
                        "%" +
                        "</h5>" +
                        "<br>"
                );
            }
            ChartLib.doughnut("packets", data, {
                xvalues: "packet",
                yvalues: ["value"],
                palette: "custom",
                yfmt: "p100",
                legend: false
            });
            ChartLib.palettes.custom = ["#EF9A9A", "#CE93D8", "#9FA8DA", "#81D4FA", "#FFE082"];
            $("#data_sslc").html("");
            for (let i = 0; i < data.length; i++) {
                $("#data_sslc").append(
                    "<div class='bullet' style='background-color:" +
                        ChartLib.palettes.custom[i] +
                        ";'>" +
                        "</div>" +
                        "<h5>" +
                        data[i].ssl +
                        "&nbsp;&nbsp;</h5><h3>" +
                        Math.round(data[i].value1) +
                        "</h3>" +
                        "<h5>" +
                        "%" +
                        "</h5>" +
                        "<br>"
                );
            }
            ChartLib.doughnut("ssl", data, {
                xvalues: "ssl",
                yvalues: ["value1"],
                palette: "custom",
                yfmt: "n",
                legend: false
            });
            ChartLib.palettes.custom = ["#FFAB91", "#C5E1A5", "#80CBC4", "#90CAF9", "#F48FB1"];
            $("#data_mimet").html("");
            for (let i = 0; i < data.length; i++) {
                $("#data_mimet").append(
                    "<div class='bullet' style='background-color:" +
                        ChartLib.palettes.custom[i] +
                        ";'>" +
                        "</div>" +
                        "<h5>" +
                        data[i].mime +
                        "&nbsp;&nbsp;</h5><h3>" +
                        Math.round(data[i].value2) +
                        "</h3>" +
                        "<h5>" +
                        "%" +
                        "</h5>" +
                        "<br>"
                );
            }
            ChartLib.doughnut("mime", data, {
                xvalues: "mime",
                yvalues: ["value2"],
                palette: "custom",
                yfmt: "n",
                legend: false
            });
            ChartLib.palettes.custom = ["#FFAB91", "#C5E1A5", "#80CBC4", "#90CAF9", "#F48FB1"];
            $("#data_top").html("");
            for (let i = 0; i < data.length; i++) {
                $("#data_top").append(
                    "<div class='bullet' style='background-color:" +
                        ChartLib.palettes.custom[i] +
                        ";'>" +
                        "</div>" +
                        "<h5>" +
                        data[i].top +
                        "&nbsp;&nbsp;</h5><h3>" +
                        Math.round(data[i].value) +
                        "</h3>" +
                        "<h5>" +
                        "%" +
                        "</h5>" +
                        "<br>"
                );
            }
            ChartLib.doughnut("top", data, {
                xvalues: "top",
                yvalues: ["value"],
                palette: "custom",
                yfmt: "n",
                legend: false
            });
        }
    });
}

function setupTable() {
    _tables["logs"] = $("#logs").DataTable({
        dom: "<lf<t>p>",
        responsive: true,
        columns: [
            { data: "fecha" },
            { data: "id_ori_h" },
            { data: "id_ori_h" },
            { data: "duracion" },
            { data: "id_resp_h" },
            { data: "id_resp_p" },
            { data: "servicio" }
        ]
    });
}
