function setupDash(){
    $(".money-a").text(fmt("ch3")(Math.floor(Math.random() * (200000000 - 230000000) + 230000000)));
    $(".money-f").text(fmt("ch3")(Math.floor(Math.random() * (200000000 - 230000000) + 230000000)));
    $(".money-g").text(fmt("ch3")(Math.floor(Math.random() * (270000000 - 350000000) + 350000000)));

    const used = Math.floor(Math.random() * (270000000 - 350000000) + 350000000);
    $("#used").text(fmt("MB")(used));
    const avail = Math.floor(Math.random() * (670000000 - 950000000) + 950000000);
    $("#avail").text(fmt("MB")(avail));
    $("#percent").text(fmt("p")(((100 / (used + avail)) * used) / 100));
    $("#percent-servers").text(fmt("p")((Math.random() * (0.8 - 1) + 1)));
    $("#percent-sla").text(fmt("p")((Math.random() * (0.99 - 1) + 1)));
    $("#percent-sla-c").text(fmt("p")((Math.random() * (0.99 - 0.99) + 0.99)));
    $("#percent-sla-p").text(fmt("p")((Math.random() * (0.98 - 1) + 1)));

    const model = getTimelineData();
    ChartLib.line("model", model, {
        yvalues: ["ye", "y1", "yl", "yu"],
        palette: "model",
        yfmt: "MB",
        // responsive: true,
        fill: [null, null, "#ffffff", "#A2A29D"],
        width: [0.5, 2, 0.1, 0.1],
        tension: [0.2, 0.2, 0.5, 0.2]
    });

}


function getTimelineData() {
    var y1 = Math.random() * 5000000 + 5000000;
    var y2 = Math.random() * 500 + 500;
    var y3 = Math.random() * 500 + 500;
    var d = moment(new Date()).startOf("day").toDate().valueOf();

    var data2 =  new Array(( moment().hours() * 60) / 5).fill(0).map((o, i) => {
        var date = new Date(d + i * 60 * 5 * 1000).valueOf();
        y1 += Math.random() * 1000000 - 500000;
        return { date, y1 };
    });   
    var data =  new Array((24 * 60) / 5).fill(0).map((o, i) => {
        var date = new Date(d + i * 60 * 5 * 1000).valueOf();
        y1 += Math.random() * 1000000 - 500000;
        y2 += Math.random() * 100 - 50;
        y3 += Math.random() * 100 - 50;
        const yl = y1 * 0.75 + Math.random();
        const yu = y1 / 0.75 + Math.random();
        const ye = y1 + Math.random() * 2000000 - 500000;
        return { date, y1, y2, y3, yl, yu, ye };
    });
    
    data.map(o =>
        Object.assign(o, {
            y1: data2.find(p => p.date == o.date) != undefined ? data.find(p => p.date == o.date).y1 : null,
        })
    );

    return data;
}