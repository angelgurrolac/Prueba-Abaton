function updatewin() {
    win();
    setupTable();
    setInterval(function () {
        win();
    }, 3000);
}

function win() {
    gaugeChart("win_health");
    Custom.bulletList("servers", data.level1.cust.adt.servers);
    var processesTable = [{
        "process": "sqlservr.exe",
        "quantity": "9,393",
        "percent": "5%"
      },
      {
        "process": "java.exe",
        "quantity": "7,223",
        "percent": "14%"
      },
      {
        "process": "explorer.exe",
        "quantity": "4,607",
        "percent": "8%"
      },
      {
        "process": "svchost.exe",
        "quantity": "3,884",
        "percent": "16%"
      },
      {
        "process": "svchost.exe",
        "quantity": 71,
        "percent": "4%"
      },
      {
        "process": "svchost.exe",
        "quantity": 58,
        "percent": "18%"
      },
      {
        "process": "spoolv.exe",
        "quantity": 46,
        "percent": "15%"
      },
      {
        "process": "dllhost.exe",
        "quantity": 45,
        "percent": "9%"
      },
      {
        "process": "w3svc.exe",
        "quantity": 19,
        "percent": "4%"
      },
      {
        "process": "lsass.exe",
        "quantity": 4,
        "percent": "12%"
      }
    ];
    makeTable("processes",processesTable);
    stackedHbar("diskbar");

    $.ajax({
        method: "POST",
        url: "/api/dash/winservices",
        cache: false,
        success: function (data) {
            ChartLib.palettes.custom = ["#36BA6E"];
            ChartLib.line("win_line_health", data, {
                xvalues: "date",
                yvalues: ["health"],
                palette: "custom",
                yfmt: "p100",
                display: true
            });
            ChartLib.palettes.custom = ["#BBC0FA"];
            ChartLib.line("cpu", data, {
                xvalues: "date",
                yvalues: ["cpu"],
                palette: "custom",
                yfmt: "p100",
                display: true,
                fill: ["#BBC0FA"]
            });
            ChartLib.palettes.custom = ["#6E5C86"];
            ChartLib.line("ram", data, {
                xvalues: "date",
                yvalues: ["ram"],
                palette: "custom",
                yfmt: "p100",
                display: true,
                fill: ["#6E5C86"]
            });
            ChartLib.palettes.custom = ["#F5C2A3"];
            ChartLib.line("disk", data, {
                xvalues: "date",
                yvalues: ["disk"],
                palette: "custom",
                yfmt: "p100",
                display: true,
                fill:["#F5C2A3"]
            });
            
        },
        error: function (a, b, c) {
            debugger;
        },
    });
}


function gaugeChart(id) {
    var health = Math.round(Math.random() * (85 - 99) + 99);
    const gaugedata = [
        {
            name: "Health",
            count: health
        },
        {
            name: "Total",
            count: 100 - health
        }
    ];
    if (_charts[id]) {
        _charts[id].data.datasets[
            {
                data: gaugedata.map(o => o.count),
                backgroundColor: ["#9ECF6E", "#D3E9BD"]
            }
        ];
        _charts[id].update();
    } else {
        var ctx = document.getElementById(id);
        _charts[id] = new Chart(ctx, {
            type: "doughnut",
            data: {
                labels: gaugedata.map(o => o.name),
                datasets: [
                    {
                        data: gaugedata.map(o => o.count),
                        backgroundColor: ["#9ECF6E", "#D3E9BD"]
                    }
                ]
            },
            options: {
                responsive: false,
                rotation: 270, // start angle in degrees
                circumference: 180, // sweep angle in degrees
    
                // borderColor: "#000000",
                borderAlign: "inner",
                plugins: {
                    legend: {
                        display: false
                    }
                }
            },
            plugins: [
                {
                    legend: {
                        display: false
                    },
                    afterDraw: function (chart) {
                        const width = chart.width;
                        const height = chart.height;
                        const ctx = chart.ctx;
                        ctx.restore();
                        const fontFamily = "Open Sans";
                        const fontSize = 28;
                        ctx.font = `${fontSize}px '${fontFamily}'`;
                        ctx.textBaseline = "middle";
                        const text = Math.round(Math.abs(health)) + "%";
                        const textSize = ctx.measureText(text);
                        const textX = (width - textSize.width) / 2;
                        const textY = height - textSize.fontBoundingBoxAscent;
                        ctx.fillText(text, textX, textY);
                        ctx.save();
                    }
                }
            ]
        });
    }
}

function setupTable(){
    _tables["processes"] = $("#processes").DataTable({
        dom: "<lf<t>p>",
        responsive: true,
        columns: [
            { data: "process" },
            { data: "quantity" },
            { data: "percent" }
        ]
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