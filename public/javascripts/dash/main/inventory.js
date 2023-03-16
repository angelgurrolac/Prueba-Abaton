function updateChartHistogramInventory() {
    setInterval(chartHistogramInventory, 10000);
}

var chartHistogramInventory1;
function chartHistogramInventory() {
    $.ajax({
        method: "POST",
        url: "/api/dash/radar",
        cache: false,
        success: function (data) {
            var ctx = document.getElementById("chartHistogramInventory");
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
            if (chartHistogramInventory1) {
                chartHistogramInventory1.data.datasets[0].data = data.map(
                    function (o) {
                        return o.real;
                    }
                );
                chartHistogramInventory1.data.datasets[1].data = data.map(
                    function (o) {
                        return o.planing - o.real;
                    }
                );
                chartHistogramInventory1.update();
            } else {
                chartHistogramInventory1 = new Chart(ctx, {
                    type: "radar",
                    data: {
                        labels: data.map(function (o) {
                            return o.label;
                        }),
                        datasets: [
                            {
                                data: data.map(function (o) {
                                    return o.real;
                                }),
                                label: "Asignado",
                                backgroundColor: color("#3CB9EA")
                                    .alpha(0.7)
                                    .rgbString(),
                                borderColor: "#3CB9EA",
                                weight: 3,
                                borderWidth: 1,
                                datalabels: {
                                    color: "black",
                                    formatter: formatter,
                                },
                            },
                            {
                                data: data.map(function (o) {
                                    return o.planing - o.real;
                                }),
                                label: "Total",
                                backgroundColor: color("#DCBC05")
                                    .alpha(0.7)
                                    .rgbString(),
                                borderColor: "#DCBC05",
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
                        responsive: false,
                        maintainAspectRatio: false,
                        animation: {
                            duration: 3000,
                        },
                        spanGaps: false,
                        plugins: {
                            legend: {
                                display: false,
                            },
                        },
                        tooltips: {
                            display: false,
                        },
                        scales: {
                            y: [
                                {
                                    stacked: true,
                                    ticks: {
                                        fontColor: "#000000",
                                        fontSize: 10,
                                    },
                                },
                            ],
                            x: [
                                {
                                    stacked: true,
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
        },
        error: function (a, b, c) {
            debugger;
        },
    });
}
