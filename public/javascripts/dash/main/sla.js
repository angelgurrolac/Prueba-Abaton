function chartSla() {
    var ctx = document.getElementById("chartSla");
    var context = ctx.getContext("2d");
    Chart.pluginService.register({
        beforeDraw: function (chart) {
            if (chart.config.options.elements.center) {
                //Get ctx from string
                var ctx = chart.chart.ctx;
                //hack to center different fonts
                var x_fix = 0;
                var y_fix = 2;
                var x = chart.canvas.clientWidth / 2;
                var y = chart.canvas.clientHeight / 2;
                ctx.beginPath();
                ctx.arc(x, y, 100, 0, 2 * Math.PI);
                ctx.fillStyle = "#272C31";
                ctx.fill();
                ctx.lineWidth = 5;
                ctx.strokeStyle = "#272C31";
                ctx.stroke();
                ctx.fillStyle = "blue";

                //Get options from the center object in options
                var centerConfig = chart.config.options.elements.center;
                var fontStyle = centerConfig.fontStyle || "Arial";
                var txt = centerConfig.text;
                var color = centerConfig.color || "#000";
                var maxFontSize = centerConfig.maxFontSize || 25;
                var sidePadding = centerConfig.sidePadding || 20;
                var sidePaddingCalculated =
                    (sidePadding / 100) * (chart.innerRadius * 2);
                //Start with a base font of 30px
                ctx.font = "30px " + fontStyle;

                //Get the width of the string and also the width of the element minus 10 to give it 5px side padding
                var stringWidth = ctx.measureText(txt).width;
                var elementWidth =
                    chart.innerRadius * 2 - sidePaddingCalculated;

                // Find out how much the font can grow in width.
                var widthRatio = elementWidth / stringWidth;
                var newFontSize = Math.floor(30 * widthRatio);
                var elementHeight = chart.innerRadius * 2;

                // Pick a new font size so it will not be larger than the height of label.
                var fontSizeToUse = Math.min(
                    newFontSize,
                    elementHeight,
                    maxFontSize
                );

                //Set font settings to draw it correctly.
                ctx.textAlign = "center";
                ctx.textBaseline = "middle";
                var centerX =
                    (chart.chartArea.left + chart.chartArea.right) / 2;
                var centerY =
                    (chart.chartArea.top + chart.chartArea.bottom) / 2;
                ctx.font = fontSizeToUse + "px " + fontStyle;
                ctx.fillStyle = color;

                //Draw text in center
                ctx.fillText(txt, centerX, centerY);
            }
        },
    });
    var colors = [
        "#3e95cd",
        "#8e5ea2"

    ];
    var bordercolors = [
        "#3e95cd",
        "#8e5ea2"
    ];

    new Chart(ctx, {
            type: "doughnut",
            data: {
                labels: ["total","actual"],
                datasets: [
                    {
                       
                        data: [95.66,4.34],
                        backgroundColor: colors,
                        borderColor:bordercolors,
                        weight: 3,
                        borderWidth: 1,
                    },
                ],
            },
            options: {
                plugins: {
                    datalabels: {
                       // hide datalabels for all datasets
                       display: false
                    }
                  },
                animation: {
                    duration: 3000,
                },
                elements: {
                    center: {
                        text:
                            "95.66%",
                        color: "#FFF", // Default is #000000
                        fontStyle: "Arial", // Default is Arial
                        maxFontSize: 30, // Default is 25
                        sidePadding: 20, // Defualt is 20 (as a percentage)
                    },
                },
                cutoutPercentage: 80,
                showTooltips: true,
                showAllTooltips: true,
                legend: {
                    display: false,
                },
                tooltips: {
                    enabled: true,
                },
               
            },
        });
    
}
