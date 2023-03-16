function gaugeChart(id) {
    var health = Math.random() * (85 - 99) + 99;
    const data = [
        {
            name: "Health",
            count: health
        },
        {
            name: "Total",
            count: 100 - health
        }
    ];

    var options = {
        type: "doughnut",
        data: {
            labels: data.map(o => o.name),
            datasets: [
                {
                    label: "# of Votes",
                    data: data.map(o => o.count),
                    backgroundColor: ["#9ECF6E", "#D3E9BD"]
                }
            ]
        },
        options: {
            responsive: false,
            rotation: 270, // start angle in degrees
            circumference: 180, // sweep angle in degrees

            // borderColor: "#000000",
            borderAlign: "inner",
            plugins: {
                legend: {
                    display: false
                }
            }
        },
        plugins: [
            {
                legend: {
                    display: false
                },
                afterDraw: function (chart) {
                    const width = chart.width;
                    const height = chart.height;
                    const ctx = chart.ctx;
                    ctx.restore();
                    const fontFamily = "Open Sans";
                    const fontSize = 28;
                    ctx.font = `${fontSize}px '${fontFamily}'`;
                    ctx.textBaseline = "middle";
                    const text = Math.round(Math.abs(health)) + "%";
                    const textSize = ctx.measureText(text);
                    const textX = (width - textSize.width) / 2;
                    const textY = height - textSize.fontBoundingBoxAscent;
                    ctx.fillText(text, textX, textY);
                    ctx.save();
                }
            }
        ]
    };

    var ctx = document.getElementById(id).getContext("2d");
    new Chart(ctx, options);
}
