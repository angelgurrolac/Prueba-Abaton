function updateadtiis() {
    adtiis();
    setupTable();
    setInterval(function () {
        adtiis();
    }, 3000);
}

function adtiis() {
    var adtTable = [
        {
            page: "/StateMsgCompressed.aspx",
            count: 1164189,
            timetaken: 192.331914319753
        },
        {
            page: "/IMSService/HelpDeskService.svc",
            count: 405394,
            timetaken: 4.2576185143342
        },
        {
            page: "/ext-svc/signaling",
            count: 312050,
            timetaken: 18083.2359814132
        },
        {
            page: "/WriteCompressedPartEJ.aspx",
            count: 256905,
            timetaken: 305.011790350518
        },
        {
            page: "/AgentHealth.aspx",
            count: 124144,
            timetaken: 348.860315440134
        },
        { page: "/GetTermid.aspx", count: 16075, timetaken: 241.880808709175 },
        {
            page: "/OBMONService/OBService.svc",
            count: 9775,
            timetaken: 24.8197442455242
        },
        {
            page: "/SSTOB/SSTOBUtil.aspx/GetRemindersC…",
            count: 6324,
            timetaken: 2324.19133459835
        },
        {
            page: "/IMSService/HelpDeskWebApiService.sv…",
            count: 3553,
            timetaken: 79.2195327891922
        },
        { page: "/IMSClient/DXR.axd", count: 1926, timetaken: 189.097092419522 }
    ];
    Custom.bulletList("servers_ADT", data.level1.cust.adt.servers);
    Custom.bulletList2("pools", data.level2.cust.adt.pools);
    $.ajax({
        method: "POST",
        url: "/api/dash/services",
        cache: false,
        success: function (data) {
            ChartLib.palettes.custom = ["#6E5C86"];
            ChartLib.line("resp_time2", data, {
                xvalues: "date",
                yvalues: ["resptime"],
                palette: "custom",
                yfmt: "n1_ms",
                display: true,
                axes: true
            });

            const iss = ["200", "302", "404", "500"];
            var n = 800;
            const barData = new Array(4).fill().map((_o, i) => ({
                name: iss[i],
                data: Math.round(
                    Math.random() *
                        ((iss[i] == "200" ? n : (n = n - 200)) - (n - 200)) +
                        (n - 200)
                )
            }));

            ChartLib.palettes.custom = [
                "#00B050",
                "#558ED5",
                "#FFC000",
                "#FF0000"
            ];
            ChartLib.bar("responsecodes", barData, {
                xvalues: "name",
                yvalues: ["data"],
                yfmt: "n",
                display: false,
                palette: "custom"
            });

            makeTable("tophits", adtTable);
        },
        error: function (a, b, c) {
            debugger;
        }
    });
}

function setupTable() {
    _tables["tophits"] = $("#tophits").DataTable({
        dom: "<lf<t>p>",
        responsive: true,
        columns: [
            { data: "page" },
            { data: "count" },
            { data: "timetaken", render: fmt("n2_ms") }
        ]
    });
}
