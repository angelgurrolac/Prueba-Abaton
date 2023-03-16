const _tables = {};

function setupDash() {
    _tables["top_ip"] = $("#top_ip").DataTable({
        dom: "t",
        columns: [{ data: "id" }, { data: "ip" }, { data: "hits" }]
    });
    _tables["top_domain"] = $("#top_domain").DataTable({
        dom: "t",
        columns: [{ data: "id" }, { data: "domain" }, { data: "hits" }]
    });
    ChartLib.palettes.triage = ["#008745", "#ffc221", "#ee3528"];
}

function makeDash() {
    const data = getData();
    makeTable("top_ip", data.top_ip);
    makeTable("top_domain", data.top_domain);
    $("#alert_import_high").text(fmt("n")(data.alert_import.map(o => o.high).reduce((a, b) => a + b)));
    $("#alert_import_med").text(fmt("n")(data.alert_import.map(o => o.med).reduce((a, b) => a + b)));
    $("#alert_import_low").text(fmt("n")(data.alert_import.map(o => o.low).reduce((a, b) => a + b)));
    $("#alert_import_total").text(fmt("n")(data.alert_import.map(o => o.high + o.med + o.low).reduce((a, b) => a + b)));
    ChartLib.line("alert_import", data.alert_import, {
        xvalues: "date",
        yvalues: ["low", "med", "high"],
        palette: "triage"
    });
    ChartLib.palettes.custom = ["#266E85","#48B5FF","#5D2F7E","#8FE3CF","#5901FE","#F7FF93","#B959A5","#18D7A0","#195BDB","#3AA2DB","#D42A37","#9BD6D2"];
    ChartLib.doughnut("alert_vector", data.alert_vector, {palette: "custom"});
    ChartLib.doughnut("alert_tech", data.alert_tech, {palette: "custom"});
    ChartLib.doughnut("alert_status", data.alert_status, { palette: "triage" });
}

function loopDash() {
    setupDash();
    makeDash();
    setInterval(makeDash, 10000);
}

let _data = null;

function getData() {
    if (!_data) {
        initData();
    }
    refreshData();
    return _data;

    function initData() {
        _data = {
            top_ip: new Array(10)
                .fill()
                .map(_ => ({
                    ip: randa([10, 192]) + "." + randi(1, 255) + "." + randi(1, 255) + "." + randi(1, 255),
                    hits: randi(10, 500)
                }))
                .sort((a, b) => b.hits - a.hits)
                .map((o, i) => Object.assign(o, { id: i + 1 })),
            top_domain: [
                "www.abaton.com.mx",
                "www.abaton.com",
                "super.abaton.com.mx",
                "tienda.com",
                "tienda.com.mx",
                "abaton.ca",
                "abaton.com",
                "abaton.com.mx",
                "abatonimages.com",
                "abaton.net"
            ]
                .map(o => ({ domain: o, hits: randi(1, 1000) }))
                .sort((a, b) => b.hits - a.hits)
                .map((o, i) => Object.assign(o, { id: i + 1 }))
        };
    }

    function refreshData() {
        _data.alert_import = new Array(24).fill().map((o, i) => ({
            date: today().setHours(i),
            low: randi(10, 45),
            med: randi(3, 4),
            high: randi(10, 15)
        }));
        _data.alert_vector = [
            {
                name: "Aggregated",
                value: randi(40, 50)
            },
            { name: "Files from email", value: randi(0, 5) },
            { name: "Files from traffic", value: randi(40, 50) },
            { name: "URL from email", value: randi(0, 5) },
            { name: "URL from traffic", value: randi(500, 1000) },
            { name: "Endpoint sensors", value: randi(100, 200) }
        ];
        _data.alert_tech = [
            "YARA",
            "Sandbox",
            "URL Reputation",
            "Intrusion Detection System",
            "Anti-Malware Engine",
            "Targeted Attack Analyzer",
            "IOC"
        ].map(o => ({ name: o, value: randi(1, 1000) }));
        _data.alert_status = ["Processed", "In process", "New"].map(o => ({ name: o, value: randi(1, 1000) }));
    }
}

function randi(a, b) {
    return Math.floor(Math.random() * (b - a) + a);
}

function randa(arr) {
    return arr[randi(0, arr.length)];
}

function today() {
    const d = new Date();
    return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}

function makeTable(id, data) {
    const table = _tables[id];
    if (table) {
        const page = table.page();
        table.clear();
        table.rows.add(data);
        table.draw();
        table.page(page);
        table.draw("page");
    }
}
