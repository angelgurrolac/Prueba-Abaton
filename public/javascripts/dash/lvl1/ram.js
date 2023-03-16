var birdsCanvas = document.getElementById("chartram");

    var birdsData = {
    labels: ["Usada","Disponible","Total"],
    datasets: [{
        data: [20, 90, 100],
        backgroundColor: [
        "rgba(149, 117, 205, 0.7)",
        "rgba(240, 98, 146, 0.7)",
        "rgba(156, 204, 101, 0.7)"
        ]
    }]
    };

    var polarAreaChart = new Chart(birdsCanvas, {
    type: 'polarArea',
    data: birdsData
    });