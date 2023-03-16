function makeDash() {
    $.ajax({
        method: "post",
        success: (data) => {
            stackedHbar("resumeCanvas", data.resume, "ch6", [
                "#235D8C",
                "#CCCCCC",
            ]);

            $("#total_amount").text(fmt("ch6")(data.globalData.amount));
            $("#num_stores").text(data.globalData.num_stores);
            $("#prod_sold").text(fmt("n")(data.globalData.prod_sold));
            const model = getTimelineData();
            ChartLib.line("timeline", model, {
                yvalues: ["ye", "y1", "yl", "yu"],
                palette: "model",
                // responsive: true,
                yfmt:"ch6",
                fill: [null, null, "#FFFFFF", "#898585"],
                width: [0.5, 2, 0.1, 0.1]
            });

            const model1 = getTimelineData2();
            ChartLib.line("timeline1", model1, {
                yvalues: ["ye", "y1", "yl", "yu"],
                palette: "model",
                // responsive: true,    
                yfmt:"n",
                fill: [null, null, "#FFFFFF", "#898585"],
                width: [0.5, 2, 0.1, 0.1]
            });

            // ChartLib.palettes.custom = ["#64C522", "#CF238F", "#4BBDDB", "#110173", "#02592E", "#466DCD"];
            ChartLib.palettes.custom = ["#00A6C6","#FB5A00", "#2EBDCB","#F2EADD","#A4DF23","#007DC5","#85BB03","#624034","#F87B1F","#51CBE3","#EAC23E","#F35B34","#D42A37","#9BD6D2"];
            ChartLib.doughnut("topcat", data.globalData.TopCategory, {
                xvalues: "Category",
                yvalues: ["Amount"],
                palette: "custom"
            });
            ChartLib.doughnut("topprod", data.globalData.TopProduct, {
                xvalues: "Product",
                yvalues: ["Amount"],
                palette: "custom"
            });
            const hours =
                moment().diff(
                    moment().set("hours", 7).set("minutes", 0),
                    "minutes"
                ) / 60;
            for (let branch of data.branches) {
                $(`#amount_${branch.ID}`).text(fmt("ch6")(branch.Amount));
                $(`#count_${branch.ID}`).text(fmt("n")(branch.Products));
                $(`#perhour_${branch.ID}`).text(
                    fmt("ch6")(branch.Amount / hours)
                );
                if (branch.ID <= 10)
                    $(`#rank_${branch.ID}`).text(
                        "#" + fmt("n")(branch.ID) + " ventas"
                    );
                else $(`#rank_${branch.ID}`).html("&nbsp;");
            }
        },
        error: (a, b, c) => {
            // debugger;
        },
    });
}

function setupDash() {}

function loopDash() {
    setupDash();
    makeDash();
    setInterval(makeDash, 60000);
}

function stackedHbar(id, data, format, palette) {
    //const disk = ["Bandwidth"];
    // const hbarData = new Array(2).fill().map((_o, i) => ({
    //     name: disk[i],
    //     count: [Math.round(Math.random() * (80000000 - 50000000) + 50000000)]
    // }));
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
                display: true,
                ticks: {
                    // Include a dollar sign in the ticks
                    callback: function (value, index, ticks) {
                        const f = fmt(format);
                        return f(value);
                    },
                },
            },
            y: {
                stacked: true,
                display: false,
            },
        },
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                enabled: false,
            },
        },
    };

    if (_charts[id]) {
        _charts[id].data.labels = data.map((o) => o.name);
        _charts[id].data.datasets = [
            {
                data: data[0].count,
                backgroundColor: palette[0],
            },
            {
                data: data[1].count,
                backgroundColor: palette[1],
            },
        ];
        _charts[id].update();
    } else {
        var ctx1 = document.getElementById(id);
        _charts[id] = new Chart(ctx1, {
            type: "bar",
            data: {
                labels: data.map((o) => o.name),
                datasets: [
                    {
                        data: data[0].count,
                        backgroundColor: palette[0],
                        stack: "Stack 0",
                    },
                    {
                        data: data[1].count,
                        backgroundColor: palette[1],
                        stack: "Stack 0",
                    },
                ],
            },

            options: barOptions_stacked,
        });
    }
}

function getTimelineData() {
    var y1 = Math.random() * 5000000 + 5000000;
    var y2 = Math.random() * 500 + 500;
    var y3 = Math.random() * 500 + 500;
    var d = moment(new Date()).startOf("day").toDate().valueOf();

    var data2 =  new Array(( moment().hours() * 60) / 5).fill(0).map((o, i) => {
        var date = new Date(d + i * 60 * 5 * 1000).valueOf();
        y1 += Math.random() * 100 - 50;
        return { date, y1 };
    });   
    var data =  new Array((24 * 60) / 5).fill(0).map((o, i) => {
        var date = new Date(d + i * 60 * 5 * 1000).valueOf();
        y1 += Math.random() * 1000000 - 500000;
        y2 += Math.random() * 100 - 50;
        y3 += Math.random() * 100 - 50;
        const yl = y1 * 0.75 + Math.random();
        const yu = y1 / 0.75 + Math.random();
        const ye = y1 + Math.random() * 2000000 - 500000;
        return { date, y1, y2, y3, yl, yu, ye };
    });
    
    data.map(o =>
        Object.assign(o, {
            y1: data2.find(p => p.date == o.date) != undefined ? data.find(p => p.date == o.date).y1 : null,
        })
    );

    return data;
}

function getTimelineData2() {
    var y1 = Math.random() * 500 + 500;
    var y2 = Math.random() * 500 + 500;
    var y3 = Math.random() * 500 + 500;
    var d = moment(new Date()).startOf("day").toDate().valueOf();

    var data2 =  new Array(( moment().hours() * 60) / 5).fill(0).map((o, i) => {
        var date = new Date(d + i * 60 * 5 * 1000).valueOf();
        y1 += Math.random() * 100 - 50;
        return { date, y1 };
    });   
    var data =  new Array((24 * 60) / 5).fill(0).map((o, i) => {
        var date = new Date(d + i * 60 * 5 * 1000).valueOf();
        y1 += Math.random() * 100 - 50;
        y2 += Math.random() * 100 - 50;
        y3 += Math.random() * 100 - 50;
        const yl = y1 * 0.75 + Math.random();
        const yu = y1 / 0.75 + Math.random();
        const ye = y1 + Math.random() * 200 - 50;
        return { date, y1, y2, y3, yl, yu, ye };
    });
    
    data.map(o =>
        Object.assign(o, {
            y1: data2.find(p => p.date == o.date) != undefined ? data.find(p => p.date == o.date).y1 : null,
        })
    );

    return data;
}