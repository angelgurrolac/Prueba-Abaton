function update() {
    line();
    setInterval(function () {
        line();
    }, 5000);
}

function health() {
    Custom.bulletList("db_bullets", data.level2.cust.adt.sqlserver.databases);
    Custom.bulletList2(
        "services_bullets",
        data.level2.cust.adt.sqlserver.services
    );
    Custom.bulletList("jobs_bullets", data.level2.cust.adt.sqlserver.backup);
    Custom.bulletList2(
        "cluster_bullets",
        data.level2.cust.adt.sqlserver.cluster
    );
}

function line() {
    $.ajax({
        method: "POST",
        url: "/api/dash/services",
        cache: false,
        success: function (data) {
            ChartLib.palettes.custom = [
                "#3e95cd",
                "#8e5ea2",
                "#3cba9f",
                "#e8c3b9",
                "#c45850",
                "#3e95cd",
                "#8e5ea2",
                "#3cba9f",
                "#e8c3b9",
                "#c45850",
            ];

            ChartLib.line("cpu_line", data, {
                xvalues: "date",
                yvalues: ["cpu"],
                palette: "custom",
                yfmt: "n",
                display: true,
                axes: true,
            });
            ChartLib.line("ram_line", data, {
                xvalues: "date",
                yvalues: ["ram"],
                palette: "custom",
                yfmt: "p100",
                display: true,
                axes: true,
            });
            $("#sqlRespTime").html(fmt("n1_ms")(Math.floor((Math.random() * (0.1 - 0.3) + 0.3) * 3000)));
            $("#sqlTrans").html(fmt("n")(Math.floor((Math.random() * (0.1 - 0.3) + 0.3) * 30000)))

        },
        error: function (a, b, c) {
            debugger;
        },
    });
}
