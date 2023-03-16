function update() {
    setInterval(tredline,30000);
}

function tredline() {
    $.ajax({
        method: "POST",
        url: "/dash/servers/timeline2",
        cache: false,
        success: function (data) {
            ChartLib.palettes.custom = ["#EC407A", "#3F51B5"];
            ChartLib.line("amount_ram", data, {
                xvalues: "date",
                yvalues: ["ram","total2"],
                yfmt: "p100",
                display:true,
                palette: "custom"
            });
            ChartLib.palettes.custom = ["#AF7AC5", "#58D68D"];
            ChartLib.line("amount_cpu", data, {
                xvalues: "date",
                yvalues: ["usado","total1"],
                yfmt: "p100",
                display:true,
                palette: "custom"
            });
            ChartLib.palettes.custom = ["#009688", "#FFC107"];
            ChartLib.line("amount_disk", data, {
                xvalues: "date",
                yvalues: ["disk","total3"],
                yfmt: "p100",
                display:true,
                palette: "custom"
            });
            ChartLib.palettes.custom = ["#F06292"];
            ChartLib.line("amount_cpuvirtual", data, {
                xvalues: "date",
                yvalues: ["cpu"],
                yfmt: "p100",
                display:true,
                palette: "custom",
                fill:["rgba(251, 183, 251, 0.5)"]
            });
            
            ChartLib.palettes.custom = ["#00BCD4", "#283593"];
            ChartLib.line("amount_ramvirtual", data, {
                xvalues: "date",
                yvalues: ["usado","total1"],
                yfmt: "p100",
                display:true,
                palette: "custom"
            });
        }
    })
}
