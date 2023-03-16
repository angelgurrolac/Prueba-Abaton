    var birdsCanvas = document.getElementById("chartbanda");
    var birdsData = {
    labels: ["Total","Usado","Disponible"],
    datasets: [{
        data: [1300, 900, 1100],
        backgroundColor: [
        "#EAC23E",
        "#2EBDCB",
        "#A4DF23"
        ]
    }]
    };
    var polarAreaChart = new Chart(birdsCanvas, {
    type: 'polarArea',
    data: birdsData
    });
function tredline() {
    $.ajax({
        method: "POST",
        url: "/dash/timeline",
        cache: false,
        success: function (data) {
            ChartLib.palettes.custom = ["#7A3748", "#898886"];
            ChartLib.line("amount_tred_actual", data, {
                xvalues: "date",
                yvalues: ["entrada","salida"],
                yfmt: "MB",
                display:true,
                palette: "custom",
                tension:[0.2,0.2]   
            });
        }
    });
}
function topDevice() {
    const datos = {
        network:{
            device: {
                top:[
                    {sem: "green", label:"10.55.231.10", score: 80.5},
                    {sem: "green", label:"10.71.100.105",score: 25.24},
                    {sem: "green", label:"10.71.100.106",score: 30.23},
                    {sem: "green", label:"10.75.100.106",score: 20.49},
                    {sem: "green", label:"10.71.100.235",score: 20.48},
                    {sem: "green", label:"10.75.100.122",score: 26.05},
                    {sem: "green", label:"10.75.100.121",score: 24.15},
                    {sem: "green", label:"10.71.100.125",score: 18},
                    {sem: "green", label:"10.71.100.121",score: 26},
                    {sem: "green", label:"10.55.231.15",score: 50}
                    
                    // {sem: "green", label:"10.55.231.10", score: 0.30},
                    // {sem: "green", label:"10.71.100.105",score: 0.13},
                    // {sem: "green", label:"10.71.100.106",score: 0.13},
                    // {sem: "green", label:"10.75.100.106",score: 0.9},
                    // {sem: "green", label:"10.71.100.235",score: 0.9},
                    // {sem: "green", label:"10.75.100.122",score: 0.9},
                    // {sem: "green", label:"10.75.100.121",score: 0.9},
                    // {sem: "green", label:"10.71.100.125",score: 0.9},
                    // {sem: "green", label:"10.71.100.121",score: 0.13},
                    // {sem: "green", label:"10.55.231.15",score: 0.25},
                ]
            }
        },
    };
    Custom.bulletBarListMB("equipos", datos.network.device.top);

}


function updatered() {
    network();
    setInterval(function () {
        network();
    }, 30000);
    
}

function network() {
    
    var iredTable = [{
        "fecha-inicio": "19-08-2022 14:32:36",
        "fecha-fin": "19-08-2022 15:32:36",
        "duracion": "1 hora",
        "categoria": "UNCLASSFIED-ROGUE_AP_DETECTED",
        "severidad": "CLEARED",
        "ip": "10.3.56.10",
        "dispositivo": "ROGUE AO 6e:31:2d"
        },
        {
        "fecha-inicio": "19-08-2022 15:00:00",
        "fecha-fin": "19-08-2022 15:10:02",
        "duracion": "10 minutos, 2 segundos",
        "categoria": "UNCLASSFIED-ROGUE_PROFILE_FAILED",
        "severidad": "CLEARED",
        "ip": "10.3.26.09",
        "dispositivo": "ROGUE AO 3e:11:1L"
        },
        {
        "fecha-inicio": "19-08-2022 16:00:00",
        "fecha-fin": "19-08-2022 16:05:00",
        "duracion": "05 minutos",
        "categoria": "UNCLASSFIED-ROGUE_PROFILE_FAILED",
        "severidad": "CLEARED",
        "ip": "10.3.26.09",
        "dispositivo": "ROGUE AO 3e:11:1L"
        },
        {
        "fecha-inicio": "19-08-2022 17:10:00",
        "fecha-fin": "19-08-2022 17:30:28",
        "duracion": "20 minutos, 28 segundos",
        "categoria": "UNCLASSFIED-ROGUE_PROFILE_FAILED",
        "severidad": "CLEARED",
        "ip": "10.3.26.09",
        "dispositivo": "ROGUE AO 3e:11:1L"
        }
    ];

    makeTable("ired", iredTable);

    $.ajax({
        method: "POST",
        url:"/dash/enlaces",
        cache: false,
        success: function (data) {
            const total = data.reduce((sum, data) => (typeof data.value== "number" ? sum + data.value : sum), 0).toFixed(2);
            data.push( {"type": "Total", "value": total});
            // ChartLib.palettes.custom = ["#E59866", "#82E0AA", "#AED6F1", "#E8DAEF"];
            ChartLib.palettes.custom = ["#2EBDCB","#EAC23E","#A4DF23","#007DC5","#85BB03","#624034","#F87B1F","#51CBE3","#EAC23E","#F35B34","#D42A37","#9BD6D2"];
            $("#data_ep").html("");
            for (let i = 0; i < data.length; i++) {
                $("#data_ep").append("<h6 class='bullet' style='background-color:"+ChartLib.palettes.custom[i]+";'>"+  
                                            "</h6>"+
                                            "<h6>"+data[i].type+"&nbsp;</h6><h5>"+data[i].value+"</h5>&nbsp;"+"<p>GB</p>"+
                                            "<br>");
                
            }
            ChartLib.doughnut("enlace_principal", data, {
                xvalues: "type",
                yvalues: ["value"],
                palette: "custom",
                yfmt: "MB",
                legend: false
            });
            ChartLib.palettes.custom = ["#F87B1F","#EAC23E","#624034","#51CBE3","#85BB03","#624034","#F87B1F","#51CBE3","#EAC23E","#F35B34","#D42A37","#9BD6D2"];
            $("#data_es").html("");
            for (let i = 0; i < data.length; i++) {
                $("#data_es").append("<div class='bullet' style='background-color:"+ChartLib.palettes.custom[i]+";'>"+  
                                            "</div>"+
                                            "<h6>"+data[i].type+"&nbsp;</h6><h5>&nbsp;"+data[i].value+"</h5>&nbsp;"+"<p>GB</p>"+
                                            "<br>");
                
            }
            // ChartLib.palettes.custom = ["#FBB7FB", "#B8B7FB", "#B7F6FB", "#B7FBB8"];
            
            ChartLib.doughnut("enlace_secundario", data, {
                xvalues: "type",
                yvalues: ["value"],
                palette: "custom",
                yfmt: "MB",
                legend: false
            });

        }
    });
}

function setupTable(){
    _tables["ired"] = $("#ired").DataTable({
        dom: "<lf<t>p>",
        responsive: true,
        columns: [
            { data: "fecha-inicio" },
            { data: "fecha-fin" },
            { data: "duracion" },
            { data: "categoria" },
            { data: "severidad" },
            { data: "ip" },
            { data: "dispositivo" }
        ]
    });
}



function stackedHbar(id) {
    const disk = ["10.55.231.10", "10.71.100.105", "10.71.100.106", "10.75.100.106", "10.75.100.105", "10.71.100.235", "10.75.100.122", "10.75.100.121", "189.255.61.10"];
    /*$("#name").html("");
            for (let i = 0; i < disk.length; i++) {
                $("#name").append("<h6>"+disk[i]+"&nbsp;</h6>"+"<br>");
            }*/
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
                display: false,
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
                backgroundColor: "#A9CCE3",
            },
            {
                data: hbarData[1].count,
                backgroundColor: "#C0504D",
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
                        backgroundColor: "#C0504D",
                    },
                ],
            },

            options: barOptions_stacked,
        });
    }
}