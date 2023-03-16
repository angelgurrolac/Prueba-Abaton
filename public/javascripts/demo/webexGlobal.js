function loopDash() {
    setupDash();
    makeDash();
    setInterval(makeDash,  60 * 1000);
    $(".period-container .dates .start").val(moment().startOf("month").format("yyyy-MM-DD"));
    $(".period-container .dates .end").val(moment().startOf("day").format("yyyy-MM-DD"));
    $(".period-container select").on("change", e => {
        const period = $(e.currentTarget);
        const custSelected = period.val() == "cust";
        if (period.attr("id") == "period-global") {
            if (period.val() != "") {
                $(".period-container select").val(period.val());
                $(".period-container select")
                    .parents(".period-container")
                    .find(".dates")
                    .css("display", custSelected ? "inline-block" : "none");
            } else {
                period.parents(".period-container").find(".dates").css("display", "none");
            }
        } else {
            $("#period-global").val("");
            $("#period-global").parents(".period-container").find(".dates").css("display", "none");
            period
                .parents(".period-container")
                .find(".dates")
                .css("display", custSelected ? "inline-block" : "none");
        }
        if (!custSelected) makeDash();
    });
    $(".period-container input[type=button].ok").on("click", e => {
        const ok = $(e.currentTarget);
        let dates = ok.parents(".dates");
        const start = dates.find(".start").val();
        const end = dates.find(".end").val();
        if (ok.parents(".period-container").find("select").attr("id") == "period-global") {
            dates = $("[id^=period-").parents(".period-container").find(".dates");
            dates.find(".start").val(start);
            dates.find(".end").val(end);
        }
        dates.find("div.edit").css("display", "none");
        dates.find("div.ok").css("display", "inline-block");
        dates.find("input.edit").val(start + " - " + end);
        makeDash();
    });
    $(".period-container input[type=button].edit").on("click", e => {
        const edit = $(e.currentTarget);
        edit.parent().css("display", "none");
        edit.parents(".dates").find(".edit").css("display", "inline-block");
    });
}

var _tables = [];

function makeDash() {
    // $("#spinner-div").show();
    let paused = false;
    $(".period-container .dates div.edit").each((i, o) => {
        if ($(o).css("display") !== "none" && $(o).parent().css("display") !== "none") {
            paused = true;
        }
    });
    if (paused) return;
    const period = {};
    $(".period-container select").each((i, o) => {
        const q = $(o);
        period[q.data().id] = q.val();
        if (period[q.data().id] === "cust") {
            const dates = q.parents(".period-container").find(".dates");
            period[q.data().id] += "|" + dates.find(".start").val() + "|" + dates.find(".end").val();
        }
    });
    $.ajax({
        method: "post",
        dataType: "json",
        cache: false,
        success: function (data) {
            $(".updatetext").text("Última actualización: " + fmt("dDMYHms")(moment()));

            if ($("#bugs").length) {
                ChartLib.palettes.custom = [
                    "#4D8FD6",
                    "#D77420",
                    "#B769E9",
                    "#E7537F",
                    "#27CBB9",
                    "#C3FA9B",
                    "#AF327F",
                    "#FF847C",
                    "#355C7D",
                    "#FD9407",
                    "#07FD76",
                    "#6A7100",
                    "#118DAC"
                ];
                const total = data.bugs.reduce(
                    (sum, value) => (typeof value.count == "number" ? sum + value.count : sum),
                    0
                );
                $("#bugsactual").html("");
                for (let i = 0; i < data.bugs.length; i++) {
                    $("#bugsactual").append(
                        "<div class='rectangle' style='background-color:" +
                            ChartLib.palettes.custom[i] +
                            ";'>" +
                            "</div>" +
                            "<h6>" +
                            data.bugs[i].name +
                            "&nbsp;</h6><h4>" +
                            ((data.bugs[i].count * 100) / total).toFixed(2) +
                            "%</h4>" +
                            "<br>"
                    );
                }
                ChartLib.pie("bugs", data.bugs, {
                    xvalues: "name",
                    yvalues: ["count"],
                    yfmt: "n",
                    legend: false,
                    palette: "custom"
                });
            }
            // if ($("#agentst").length) {
            //     ChartLib.palettes.custom = ["#4D8FD6"];
            //     ChartLib.bar("agentst", data.agentst, {
            //         xvalues: "date",
            //         yvalues: ["value"],
            //         yfmt: "n",
            //         xfmt: getFormat("agentst"),
            //         display: true,
            //         palette: "custom"
            //     });
            //     const agentst = data.agentst.filter(o => o.value !== null);
            //     if (agentst.length != 0) $("#agentstactual").text(fmt("n")(agentst[agentst.length - 1].value));
            // }
            if ($("#pt-video-summary").length) {
                makeTable("pt-video-summary", data.ptvsummary);
            }
            if ($("#pt-audio-summary").length) {
                makeTable("pt-audio-summary", data.ptasummary);
            }
            // if ($("#agents").length) {
            //     for (let i = 0; i < data.agents.length; i++) {
            //         let agents = [];
            //         for (let j = 0; j < data.agents[i].agents.length; j++) {
            //             agents.push(data.agents[i].agents[j].agentName);
            //         }
            //         data.agents[i].agents = agents;
            //     }
            //     makeTable("agents", data.agents);
            // }

            makeChartLine("querytime", data.line, ["#FF847C", "#8C8C8C"], "n1_ms");
            makeChartLine("jitter", data.line, ["#4D8FD6", "#8C8C8C"], "n2_ms");
            makeChartLine("latency", data.line, ["#D77420", "#8C8C8C"], "n1_ms");
            makeChartLine("loss", data.line, ["#B769E9", "#8C8C8C"], "p100");
            makeChartLine("resptime", data.line, ["#E7537F", "#8C8C8C"], "n1_ms");
            makeChartLine("xferrate", data.line, ["#27CBB9", "#8C8C8C"], "MB");
            makeChartLine("mos", data.line, ["#56cc00", "#8C8C8C"], "n2");
            makeChartLine("pdv", data.line, ["#AF327F", "#8C8C8C"], "n2_ms");
            makeChartLine("ptajitter", data.line, ["#355C7D", "#8C8C8C"], "n2_ms");
            makeChartLine("ptalatency", data.line, ["#FD9407", "#8C8C8C"], "n1_ms");
            makeChartLine("ptaloss", data.line, ["#06cc5f", "#8C8C8C"], "p100");
            makeChartLine("ptvjitter", data.line, ["#a7b300", "#8C8C8C"], "n2_ms");
            makeChartLine("ptvlatency", data.line, ["#118DAC", "#8C8C8C"], "n1_ms");
            makeChartLine("ptvloss", data.line, ["#4D8FD6", "#8C8C8C"], "p100");

            const model = getTimelineData();
            ChartLib.line("model-jitter", model, {
                yvalues: ["ye", "y1", "yl", "yu"],
                palette: "model",
                // responsive: true,
                fill: [null, null, "#ffffff", "#8C8C8C"],
                width: [0.5, 2, 0.1, 0.1],
                tension: [0.2, 0.2, 0.5, 0.2]
            });
            const model1 = getTimelineData();
            ChartLib.line("model-latency", model1, {
                yvalues: ["ye", "y1", "yl", "yu"],
                palette: "model",
                // responsive: true,
                fill: [null, null, "#ffffff", "#8C8C8C"],
                width: [0.5, 2, 0.1, 0.1],
                tension: [0.2, 0.2, 0.5, 0.2]
            });
            const model2 = getTimelineData();
            ChartLib.line("model-loss", model2, {
                yvalues: ["ye", "y1", "yl", "yu"],
                palette: "model",
                // responsive: true,
                fill: [null, null, "#ffffff", "#8C8C8C"],
                width: [0.5, 2, 0.1, 0.1],
                tension: [0.2, 0.2, 0.5, 0.2]
            });
        },
        error: function (a, b, c) {
            debugger;
        }
    });
}


function makeChartLine(id, data, colors, format){
    ChartLib.palettes.custom = colors;
    ChartLib.line(id, data, {
        xvalues: "date",
        yvalues: [id + "Avg", id + "Max"],
        yfmt: format,
        display:true,
        palette: "custom"
    });
}

function makeTable(id, data) {
    var table = _tables[id];
    if (table) {
        const page = table.page();
        table.clear();
        table.rows.add(data);
        table.draw();
        table.page(page);
        table.draw("page");
    }
}

function setupDash() {
    // moment.locale('es-mx');
    for (let id of ["pt-video-summary", "pt-audio-summary"])
        _tables[id] = $(`#${id}`).DataTable({
            dom: "<lf<t>p>",
            responsive: true,
            lengthMenu: [
                [5, 10, 25, 50, -1],
                [5, 10, 25, 50, "Todos"]
            ],
            columns: [
                { data: "date", render: fmt("dDMYHm") },
                {
                    data: "jitter",
                    render: o => (o == null ? "0.00 ms" : o.toFixed(2) + " ms")
                },
                {
                    data: "latency",
                    render: o => (o == null ? "0.00 ms" : o.toFixed(2) + " ms")
                },
                {
                    data: "loss",
                    render: o => (o == null ? "0.00%" : o.toFixed(2) + "%")
                }
            ]
        });
    _tables["alerts"] = $("#alerts").DataTable({
        dom: "<lf<t>p>",
        responsive: true,
        columns: [
            { data: "dateStart", render: fmt("dDMYHm") },
            { data: "dateEnd", render: fmt("dDMYHm") },
            { data: "ruleName" },
            { data: "ruleExpression" }
        ]
    });
    _tables["agents"] = $("#agents").DataTable({
        dom: "<lf<t>p>",
        responsive: true,
        columnDefs: [{ targets: [0, 1], type: "date-eu" }],
        order: [[0, "desc"]],
        columns: [
            { data: "dateStart", render: fmt("dDMy") },
            { data: "dateEnd", render: fmt("dDMy") },
            { data: "ruleName" },
            { data: "ruleExpression" },
            { data: "agents" }
        ]
    });
    $("#period-global").prepend("<option>");
    $("#period-global").val("");
}

function getTimelineData() {
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
