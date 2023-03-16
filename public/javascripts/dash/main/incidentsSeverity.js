function updateChartincidentsSeverity() {
    setInterval(chartincidentsSeverity, 8000);
}

var chartincidentsSeverity1;
function chartincidentsSeverity() {
    $.ajax({
        method: "POST",
        url: "/api/dash/byseveritylevel",
        cache: false,
        success: function (data) {
            var ctx = document.getElementById("chartincidentsSeverity");
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
            if (chartincidentsSeverity1) {
                chartincidentsSeverity1.data.datasets[0].data = data.map(
                    function (o) {
                        return o.actual;
                    }
                );
                chartincidentsSeverity1.data.datasets[1].data = data.map(
                    function (o) {
                        return o.total;
                    }
                );
                chartincidentsSeverity1.update();
            } else {
                chartincidentsSeverity1 = new Chart(ctx, {
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
                                backgroundColor: color("#FF4C97")
                                    .alpha(0.7)
                                    .rgbString(),
                                borderColor: "#FF4C97",
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
                                backgroundColor: color("#F9B941")
                                    .alpha(0.7)
                                    .rgbString(),
                                borderColor: "#F9B941",
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
                            display: false,
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
