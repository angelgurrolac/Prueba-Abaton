const _charts = {};

const ChartLib = {
    colors: {
        BACK: "#353B3E",
        SIDE: "#27282F",
        WIDG: "#ffffff"
    },
    palettes: {
        default: [
            "#007dc5",
            "#ee3528",
            "#ffc221",
            "#008745",
            "#75b8e6",
            "#eb078c",
            "#f3731e",
            "#78bf42",
            "#004a8f",
            "#682b8f",
            "#682b8f",
            "#946e8c",
            "#357a28"
        ],
        // default: [
        //     "#ff3333",
        //     "#007aff",
        //     "#29cc5f",
        //     "#f9c80e",
        //     "#ff00ff",
        //     "#00cccc",
        //     "#f86624",
        //     "#a576ff",
        //     "#914A35",
        //     "#cccccc"
        // ],
        pastel: ["#FFB0BA", "#FFDDBD", "#FFFEC0", "#B4FFCD", "#B5E3FD"],
        triage: ["#800000", "#FF0000", "#FFA500", "#FFFF00", "#00FFFF"],
        model: ["#F76300", "#27D507", null, null]
    },
    axes: {
        font: { family: "Open Sans", size: 12, color: "#666666" }
    },

    line: (id, data, options) => {
        options = Object.assign({ xvalues: "date", yvalues: ["value"], axes: true, ds: {} }, options || {});
        if (typeof options.yvalues == "string") options.yvalues = [options.yvalues];
        options.palette = options.color ? [options.color] : ChartLib.palettes[options.palette || "default"];
        const xdata = data.map(o => o[options.xvalues]);
        const ydata = options.yvalues.map(f => data.map(o => o[f]));
        if (_charts[id]) {
            _charts[id].data.labels = xdata;
            _charts[id].options.scales.xAxis.ticks.callback = i => {
                const f = options.xcb ?? fmt(options.xfmt || "dHm");
                return f(xdata[i]);
            };
            for (let i = 0; i < ydata.length; i++) {
                _charts[id].data.datasets[i].data = ydata[i];
            }
            const tcb = _charts[id].options.plugins.tooltip.callbacks;
            tcb.title = tooltipItems => {
                const f = fmt(options.xfmt || "dHm");
                return f(parseInt(tooltipItems[0].label));
            };
            tcb.label = tooltipItem => {
                const f = fmt(options.yfmt || "n");
                return f(parseInt(tooltipItem.raw));
            };
            _charts[id].update();
        } else {
            const ctx = document.getElementById(id);
            if (!ctx) return;
            const params = {
                type: options.type ?? "line",
                data: {
                    labels: xdata,
                    datasets: options.yvalues.map((_, i) =>
                        Object.assign(
                            {
                                data: ydata[i],
                                borderColor: options.palette[i],
                                borderWidth: (options.width || [])[i] || 2,
                                fill:
                                    options.fill && options.fill[i]
                                        ? {
                                              target: "origin",
                                              above: options.fill[i]
                                          }
                                        : undefined,
                                pointRadius: 0,
                                tension: (options.tension || [])[i] || 0,
                                spanGaps: true
                            },
                            options.ds
                        )
                    )
                },
                options: {
                    responsive: options.responsive || false,
                    maintainAspectRatio: true,
                    plugins: {
                        legend: {
                            display: false //TODO: parametrize
                        },
                        tooltip: {
                            callbacks: {
                                title: tooltipItems => {
                                    const f = fmt(options.xfmt || "dHm");
                                    return f(parseInt(tooltipItems[0].label));
                                },
                                label: tooltipItem => {
                                    const f = fmt(options.yfmt || "n");
                                    return f(parseInt(tooltipItem.raw));
                                }
                            }
                        }
                    },
                    animation: { duration: options.disableAnimation ? 0 : 1000 },
                    scales: {
                        yAxis: {
                            display: options.axes,
                            min: options.yrange ? options.yrange[0] : undefined,
                            max: options.yrange ? options.yrange[1] : undefined,
                            ticks: {
                                font: {
                                    family: ChartLib.axes.font.family,
                                    size: ChartLib.axes.font.size
                                },
                                color: ChartLib.axes.font.color,
                                callback: function (y) {
                                    const f = options.ycb ?? fmt(options.yfmt || "n");
                                    return f(y);
                                },
                                maxRotation: 0,
                                autoSkip: true,
                                autoSkipPadding: 4
                            }
                        },
                        xAxis: {
                            display: options.axes,
                            ticks: {
                                font: {
                                    family: ChartLib.axes.font.family,
                                    size: ChartLib.axes.font.size
                                },
                                color: ChartLib.axes.font.color,
                                callback: i => {
                                    const f = options.xcb ?? fmt(options.xfmt || "dHm");
                                    return f(xdata[i]);
                                },
                                min: options.xrange ? options.xrange[0] : undefined,
                                max: options.xrange ? options.xrange[1] : undefined,
                                maxRotation: 0,
                                autoSkip: true,
                                autoSkipPadding: 20
                            }
                        }
                    }
                }
            };
            _charts[id] = new Chart(ctx, params);
        }
    },

    radar: (id, data, options) => {
        options = Object.assign({ xvalues: "date", yvalues: ["value"], ds: {} }, options || {});
        if (typeof options.yvalues == "string") options.yvalues = [options.yvalues];
        options.palette = options.color ? [options.color] : ChartLib.palettes[options.palette || "default"];
        const xdata = data.map(o => o[options.xvalues]);
        const ydata = options.yvalues.map(f => data.map(o => o[f]));
        if (_charts[id]) {
            _charts[id].data.labels = xdata;
            for (let i = 0; i < ydata.length; i++) {
                _charts[id].data.datasets[i].data = ydata[i];
            }
            _charts[id].update();
        } else {
            const ctx = document.getElementById(id);
            if (!ctx) return;
            _charts[id] = new Chart(ctx, {
                type: "radar",
                data: {
                    labels: xdata,
                    datasets: options.yvalues.map((_, i) => {
                        return Object.assign(
                            {
                                data: ydata[i],
                                borderColor: options.palette[i],
                                borderWidth: (options.width || [])[i] || 2,
                                backgroundColor: options.palette[i] + "80",
                                pointRadius: 0,
                                tension: 0
                            },
                            options.ds
                        );
                    })
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            display: false
                        }
                    },
                    scales: {
                        r: {
                            angleLines: {
                                display: false
                            },
                            grid: {
                                color: "#353B3E"
                            },
                            ticks: {
                                backdropColor: "transparent",
                                font: {
                                    family: ChartLib.axes.font.family,
                                    size: ChartLib.axes.font.size
                                },
                                color: ChartLib.axes.font.color
                            },
                            pointLabels: {
                                font: {
                                    family: ChartLib.axes.font.family,
                                    size: ChartLib.axes.font.size
                                },
                                color: ChartLib.axes.font.color
                            }
                        }
                    }
                }
            });
        }
    },

    pie: (id, data, options) => {
        options = options || {};
        options.palette = options.color ? [options.color] : ChartLib.palettes[options.palette || "default"];
        options.legend = options.legend ?? true;
        const xdata = data.map(o => o[options.xvalues || "name"]);
        options.yvalues = options.yvalues || ["value"];
        const ydata = options.yvalues.map(f => data.map(o => o[f]));
        if (_charts[id]) {
            _charts[id].data.labels = xdata;
            for (let i = 0; i < ydata.length; i++) {
                Object.assign(_charts[id].data.datasets[i], {
                    data: ydata[i],
                    backgroundColor: options.palette
                });
            }
            _charts[id].update();
        } else {
            const ctx = document.getElementById(id);
            _charts[id] = new Chart(ctx, {
                type: options.gap ? "doughnut" : "pie",
                data: {
                    labels: xdata,
                    datasets: options.yvalues.map((_, i) => ({
                        data: ydata[i],
                        borderColor: "transparent",
                        backgroundColor: options.palette
                    }))
                },
                options: {
                    responsive: options.responsive || false,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: options.legend
                            ? {
                                  position: options.legendposition ? options.legendposition : "right",
                                  labels: {
                                      font: {
                                          family: ChartLib.axes.font.family,
                                          size: ChartLib.axes.font.size
                                      },
                                      color: ChartLib.axes.font.color
                                  }
                              }
                            : { display: false }
                    },
                    cutoutPercentage: options.gap ? (typeof options.gap === "boolean" ? 75 : options.gap) : 0
                }
            });
        }
    },

    doughnut: (id, data, options) => ChartLib.pie(id, data, Object.assign({ gap: true }, options || {})),

    bar: (id, data, options) => {
        options = options || {};
        options.palette = options.color ? [options.color] : ChartLib.palettes[options.palette || "default"];
        const xdata = data.map(o => o[options.xvalues || "name"]);
        const ydata = options.yvalues.map(f => data.map(o => o[f]));
        if (_charts[id]) {
            _charts[id].data.labels = xdata;

            _charts[id].options.scales.xAxis.ticks.callback = i => {
                const f = fmt(options.xfmt || "s");
                return f(xdata[i]);
            };
            _charts[id].options.scales.yAxis.ticks.callback = o => {
                const f = fmt(options.yfmt || "n");
                return f(o);
            };
            const tcb = _charts[id].options.plugins.tooltip.callbacks;
            tcb.title = tooltipItems => {
                const f = fmt(options.xfmt || "dHm");
                return f(parseInt(tooltipItems[0].label));
            };
            tcb.label = tooltipItem => {
                const f = fmt(options.yfmt || "n");
                return f(parseInt(tooltipItem.raw));
            };

            for (let i = 0; i < ydata.length; i++) {
                _charts[id].data.datasets[i].data = ydata[i];
            }
            _charts[id].update();
        } else {
            const ctx = document.getElementById(id);
            _charts[id] = new Chart(ctx, {
                type: "bar",
                data: {
                    labels: xdata,
                    datasets: options.yvalues.map((_, i) => ({
                        data: ydata[i],
                        backgroundColor: options.flip ? options.palette : options.palette
                    }))
                },
                options: {
                    indexAxis: options.type == "hbar" ? "y" : "x",
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            display: false //TODO: parametrize
                        }
                    },
                    scales: {
                        yAxis: {
                            display: options.display,
                            ticks: {
                                font: {
                                    family: ChartLib.axes.font.family,
                                    size: ChartLib.axes.font.size
                                },
                                color: ChartLib.axes.font.color,
                                callback: function (y) {
                                    const f = options.ycb ?? fmt(options.yfmt || "n");
                                    return f(y);
                                },
                                min: options.yrange ? options.yrange[0] : undefined,
                                max: options.yrange ? options.yrange[1] : undefined,
                                maxRotation: 0,
                                autoSkip: true,
                                autoSkipPadding: 4
                            }
                        },
                        xAxis: {
                            ticks: {
                                font: {
                                    family: ChartLib.axes.font.family,
                                    size: ChartLib.axes.font.size
                                },
                                color: ChartLib.axes.font.color,
                                callback: i => {
                                    const f = fmt(options.xfmt || "s");
                                    return f(xdata[i]);
                                },
                                min: options.xrange ? options.xrange[0] : undefined,
                                max: options.xrange ? options.xrange[1] : undefined,
                                maxRotation: 0,
                                autoSkip: true,
                                autoSkipPadding: 20
                            }
                        }
                    },
                    plugins: {
                        legend: {
                            display: false
                        },
                        tooltip: {
                            callbacks: {
                                title: tooltipItems => {
                                    const f = fmt(options.xfmt || "dHm");
                                    return f(parseInt(tooltipItems[0].label));
                                },
                                label: tooltipItem => {
                                    const f = fmt(options.yfmt || "n");
                                    return f(parseInt(tooltipItem.raw));
                                }
                            }
                        }
                    }
                }
            });
        }
    },

    hbar: (id, data, options) => {
        ChartLib.bar(id, data, Object.assign({ type: "hbar" }, options || {}));
    },

    heatmap: (id, data, options) => {
        options = options || {};
        const rows = data.length;
        const cols = data[0].length;
        const colors = data.map(o => o.map(p => getColor(p)));
        if (_charts[id]) {
            for (let i = 0; i < rows; i++) {
                _charts[id].data.datasets[i].backgroundColor = colors[i];
            }
            _charts[id].update();
        } else {
            const ctx = document.getElementById(id);
            _charts[id] = new Chart(ctx, {
                type: "bar",
                data: {
                    labels: new Array(cols).fill().map((_, i) => i.toString()),
                    datasets: new Array(rows).fill().map((_, i) => ({
                        data: new Array(cols).fill(1),
                        backgroundColor: colors[i],
                        barPercentage: 1,
                        categoryPercentage: 1
                    }))
                },
                options: {
                    responsive: true,
                    plugins: {
                        legend: {
                            display: false
                        }
                    },
                    scales: {
                        xAxis: {
                            stacked: true,
                            ticks: {
                                font: {
                                    family: ChartLib.axes.font.family,
                                    size: ChartLib.axes.font.size
                                },
                                color: ChartLib.axes.font.color,
                                callback: fmt(options.xfmt || "s"),
                                maxRotation: 0,
                                autoSkip: true,
                                autoSkipPadding: 20
                            }
                        },
                        yAxis: {
                            stacked: true,
                            ticks: {
                                font: {
                                    family: ChartLib.axes.font.family,
                                    size: ChartLib.axes.font.size
                                },
                                color: ChartLib.axes.font.color,
                                callback: fmt(options.xfmt || "s"),
                                max: 15,
                                maxRotation: 0,
                                autoSkip: true,
                                autoSkipPadding: 20
                            }
                        }
                    }
                }
            });
        }

        function getColor(level) {
            const r = 255 - Math.floor(level * 255 * 0.8 + 0.2);
            const g = 255 - Math.floor(level * 255 * 0.3 + 0.7);
            const b = 255 - Math.floor(level * 255 * 0.5 + 0.5);
            return `rgb(${r},${g},${b})`;
        }
    },

    grid1D: (id, data, colors) => {
        let ctx = document.getElementById(id);
        if (!ctx) return;
        ctx = ctx.getContext("2d");
        const sum = data.reduce((a, b) => a + b);
        let y = 0;
        for (let i = 0; i < data.length; i++) {
            ctx.fillStyle = colors[i];
            const h = (data[i] * ctx.canvas.height) / sum;
            ctx.fillRect(0, y, ctx.canvas.width, h);
            y += h;
        }
    },

    grid2D: (id, data, colors) => {
        let ctx = document.getElementById(id);
        if (!ctx) return;
        ctx = ctx.getContext("2d");
        const N = data.length,
            n = Math.round(Math.sqrt(N)),
            m = Math.ceil(N / n);
        const w = ctx.canvas.width / n,
            h = ctx.canvas.height / m;
        let y = 0,
            k = 0;
        for (let i = 0; i < m; i++) {
            let x = 0;
            for (let j = 0; j < n; j++) {
                ctx.fillStyle = colors[data[k]];
                ctx.fillRect(x, y, w, h);
                x += w;
                if (++k >= N) break;
            }
            y += h;
        }
    },

    gridNM: (id, data, colors) => {
        let ctx = document.getElementById(id);
        if (!ctx) return;
        ctx = ctx.getContext("2d");
        const n = data.length;
        const W = ctx.canvas.width,
            h = ctx.canvas.height / n;
        let y = 0;
        for (let i = 0; i < n; i++) {
            let sum = 0;
            for (let k in data[i]) {
                sum += data[i][k];
            }
            x = 0;
            for (let k of Object.keys(data[i])) {
                const w = (W * data[i][k]) / sum;
                ctx.fillStyle = colors[k];
                ctx.fillRect(x, y, w, h);
                x += w;
            }
            y += h;
        }
    },

    circle: (id, value, options) => {
        options = options ?? {};
        const ctx = document.getElementById(id);
        const r = ctx.height / 2;
        let rem = r;
        const w = [2, 6, 10, undefined].map(o => {
            const res = (o * 100) / r;
            if (o !== undefined) {
                rem -= res;
                return res;
            } else return (rem * 100) / r;
        });
        const data = value > 0 ? [value, 100 - value] : [100 + value, -value];
        const back =
            (options.mode ?? "dual") == "dual"
                ? value > 0
                    ? ["#36BA6E", "#adbdcc"]
                    : ["#adbdcc", "#F6404F"]
                : [colorblend(value), "#adbdcc"];
        if (_charts[id]) {
            _charts[id].data.datasets[2].data = data;
            _charts[id].data.datasets[2].backgroundColor = back;
            _charts[id].options.textValue = value;
            _charts[id].update();
        } else {
            _charts[id] = new Chart(ctx, {
                type: "pie",
                data: {
                    datasets: [
                        {
                            borderWidth: [0],
                            backgroundColor: "white",
                            weight: w[0],
                            data: [1]
                        },
                        {
                            borderWidth: [0],
                            backgroundColor: "black",
                            weight: w[1],
                            data: [1]
                        },
                        {
                            borderWidth: [0, 0],
                            backgroundColor: back,
                            weight: w[2],
                            borderRadius: 10,
                            data: data
                        },
                        {
                            borderWidth: [0],
                            backgroundColor: "white",
                            weight: w[3],
                            data: [1]
                        }
                    ]
                },
                options: {
                    responsive: false,
                    fontSize: options.fontSize ?? 21,
                    textValue: value,
                    legend: {
                        display: false
                    },
                    layout: {
                        padding: 1
                    },
                    tooltips: false
                },
                plugins: [
                    {
                        afterDraw: function (chart) {
                            const width = chart.width,
                                height = chart.height,
                                ctx = chart.ctx;
                            ctx.restore();
                            const fontFamily = chart.options.font.family;
                            const fontSize = chart.options.font.size;
                            ctx.font = `${fontSize}px '${fontFamily}'`;
                            ctx.textBaseline = "middle";
                            const text =
                                    // Se quita de forma temporal
                                    // (chart.options.textValue > 0 ? "▲" : "▼") +
                                    Math.round(Math.abs(chart.options.textValue)) + "%",
                                textX = (width - ctx.measureText(text).width + 4) / 2,
                                textY = (height + fontSize - 2 / 2) / 2;
                            ctx.fillText(text, textX, textY);
                            ctx.save();
                        }
                    }
                ]
            });
        }
    }
};

function colorblend(value) {
    let start, end;
    if (value < 50) {
        start = { R: 255, G: 0, B: 0 };
        end = { R: 255, G: 255, B: 0 };
        value = value * 2;
    } else {
        start = { R: 255, G: 255, B: 0 };
        end = { R: 0, G: 255, B: 0 };
        value = (value - 50) * 2;
    }
    return (
        "#" +
        hex(Math.floor(((end.R - start.R) * value) / 100 + start.R)) +
        hex(Math.floor(((end.G - start.G) * value) / 100 + start.G)) +
        hex(Math.floor(((end.B - start.B) * value) / 100 + start.B))
    );
}

function hex(n) {
    return n.toString(16).padStart(2, "0");
}
