var birdsCanvas = document.getElementById("chartdatos");

    var birdsData = {
    labels: ["DS-BACKUP-COR","DS-DATOS-COR","SpringpathDS-FCH2114V1XU","VeeamBackup_HXVeeamEPCOR.cenace.com","Total"],
    datasets: [{
        data: [25, 25, 25, 25, 80],
        backgroundColor: [
        "rgba(92, 107, 192, 0.7)",
        "rgba(38, 198, 218, 0.7)",
        "rgba(156, 204, 101, 0.7)",
        "rgba(240, 98, 146, 0.7)",
        "rgba(255, 138, 101, 0.7)"
        ]
    }]
    };

    var polarAreaChart = new Chart(birdsCanvas, {
    type: 'polarArea',
    data: birdsData
    });


function updatechartbar() {
    setInterval(chartbar,3000);
}
function chartbar(){
    $.ajax({
        method: "POST",
        url:"/dash/servers/datos",
        cache: false,
        success: function (data) {
            ChartLib.palettes.custom =["#FFAB91", "#A5D6A7", "#CE93D8"];
            ChartLib.bar("chartbar", data, {
                xvalues: "type",
                yvalues: ["value"],
                yfmt: "p100",
                yrange: [0, 100],
                palette: "custom"
            });

        }
    });
}