function updateChartHistogramContacts() {
    setInterval(chartHistogramContacts, 10000);
}

var chartHistogramContacts1;
function chartHistogramContacts() {
    $.ajax({
        method: "POST",
        url: "/api/dash/bar",
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
                                backgroundColor: color("#2C9E8E")
                                    .alpha(0.7)
                                    .rgbString(),
                                borderColor: "#2C9E8E",
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
                                backgroundColor: color("#004D96")
                                    .alpha(0.7)
                                    .rgbString(),
                                borderColor: "#004D96",
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
                            y: {
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
                            x: {
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
