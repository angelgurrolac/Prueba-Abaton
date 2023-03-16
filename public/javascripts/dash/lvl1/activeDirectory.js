function update() {
    makeDash();
    setInterval(function () {
        makeDash();
    },10000);
}

function makeDash() {
    $.ajax({
        method: "POST",
        url: "/dash/activeDirectory/",
        cache: false,
        success: function (data) {
            ChartLib.palettes.custom = ["#24B6D6", "#cccccc"];
            ChartLib.doughnut("ad_LSASS_network", data.network, {
                xvalues: "ldap",
                yvalues: ["value1"],
                palette: "custom",
                yfmt: "n",
                legend: false
            });
            ChartLib.palettes.custom = ["#619052", "#cccccc"];
            ChartLib.doughnut("ad_LSASS_replica_cpu", data.network, {
                xvalues: "ldap",
                yvalues: ["value1"],
                palette: "custom",
                yfmt: "n",
                legend: false
            });
            ChartLib.palettes.custom = ["#36BA6E", "#cccccc"];
            ChartLib.doughnut("ad_store_objects", data.network, {
                xvalues: "ldap",
                yvalues: ["value1"],
                palette: "custom",
                yfmt: "n",
                legend: false
            });
            ad_os_cpu
            ChartLib.palettes.custom = ["#36BA6E", "#cccccc"];
            ChartLib.doughnut("ad_os_cpu", data.network, {
                xvalues: "ldap",
                yvalues: ["value1"],
                palette: "custom",
                yfmt: "n",
                legend: false
            });
            stackedHbar("ad_bandwidth_network",data.disk,"MB",["#F08A5C","#CCCCCC"]);
            stackedHbar("ad_LSASS_memory",data.disk,"MB",["#49A1BC","#CCCCCC"]);
            stackedHbar("ad_LSASS_queue",data.queue,"n",["#235D8C","#CCCCCC"]);
            stackedHbar("ad_LSASS_replica_memory",data.disk,"MB",["#36BA6E","#CCCCCC"]);
            stackedHbar("ad_LSASS_replica_queue",data.queue,"n",["#9CCC65","#CCCCCC"]);
            stackedHbar("ad_store_updates",data.queue,"n",["#F08A5C","#CCCCCC"]); 
            stackedVbar("ad_store",data.disk,["#7A61BA","#CCCCCC"]);
            stackedVbar("ad_os_disk",data.disk,["#F8766D","#CCCCCC"]);
            stackedHbar("ad_os_ram",data.disk,"MB",["#F5C767","#CCCCCC"]); 
            stackedHbar("ad_os_queue",data.queue,"n",["#F08A5C","#CCCCCC"]); 
        }
    });
}

function stackedHbar(id,data,format,palette) {
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
            enabled: false
        },
        hover: {
            animationDuration: 0
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
                    }
                }
            },
            y: {
                stacked: true,
                display: false
            }
        },
        plugins: {
            legend: {
                display: false
            },
            tooltip: {
                enabled: false
            }
        }
    };

    if (_charts[id]) {
        _charts[id].data.labels =  data.map((o) => o.name);
        _charts[id].data.datasets = [
            {
                data: data[0].count,
                backgroundColor: palette[0]
            },
            {
                data: data[1].count,
                backgroundColor: palette[1]
            }
        ];
        _charts[id].update();
    } else {
        var ctx1 = document.getElementById(id);
        _charts[id] = new Chart(ctx1, {
            type: "bar",
            data: {
                labels:  data.map((o) => o.name),
                datasets: [
                    {
                        data: data[0].count,
                        backgroundColor:  palette[0],
                        stack: "Stack 0"
                    },
                    {
                        data: data[1].count,
                        backgroundColor: palette[1],
                        stack: "Stack 0"
                    }
                ]
            },

            options: barOptions_stacked
        });
    }
}

function stackedVbar(id,data,palette) {
    // const store = ["store"];
    // const data = new Array(2).fill().map((_o, i) => ({
    //     name: store[i],
    //     count: [Math.round(Math.random() * 101)]
    // }));
    var barOptions_stacked = {
        responsive: false,
        tooltips: {
            enabled: false
        },
        hover: {
            animationDuration: 0
        },
        scales: {
            x: {
                stacked: true,
                display: false
            },
            y: {
                stacked: true,
                display: false
            }
        },
        plugins: {
            legend: {
                display: false
            },
            tooltip: {
                enabled: false
            }
        }
    };

    if (_charts[id]) {
        _charts[id].data.labels =  data.map((o) => o.name);
        _charts[id].data.datasets = [
            {
                data: data[0].count,
                backgroundColor: palette[0],
                stack: "Stack 0"
            },
            {
                data: data[1].count,
                backgroundColor: palette[1],
                stack: "Stack 0"
            }
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
                        backgroundColor:palette[0],
                        stack: "Stack 0"
                    },
                    {
                        data: data[1].count,
                        backgroundColor:palette[1],
                        stack: "Stack 0"
                    }
                ]
            },

            options: barOptions_stacked
        });
    }
}
