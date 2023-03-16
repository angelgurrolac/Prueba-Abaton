function makeDash() {
    $.ajax({
        method: "post",
        success: (data) => {
            ChartLib.palettes.custom = ["#00A6C6","#FB5A00", "#2EBDCB","#F2EADD","#A4DF23","#007DC5","#85BB03","#624034","#F87B1F","#51CBE3","#EAC23E","#F35B34","#D42A37","#9BD6D2"];
            ChartLib.doughnut("firma_chart", data.firma, {
                xvalues: "name",
                yvalues: ["count"],
                yfmt: "n",
                legend: false,
                responsive: true,
                palette: "custom",
            });
            const total = data.firma.reduce(
                (sum, value) =>
                    typeof value.count == "number" ? sum + value.count : sum,
                0
            );
            $("#firma_actual").html("");
            for (let i = 0; i < data.firma.length; i++) {
                $("#firma_actual").append(
                    "<div class='rectangle' style='background-color:" +
                        ChartLib.palettes.custom[i] +
                        ";'>" +
                        "</div>" +
                        "<h4 class='m-0'>" +
                        data.firma[i].name +
                        "&nbsp;</h4><h3 class='m-0'>" +
                        ((data.firma[i].count * 100) / total).toFixed(2) +
                        "%</h3>" +
                        "<br>"
                );
            }
            const algoritmos = {
                apps: [
                    { sem: "green", label: "SHA256-RSA", score: Math.random() * (1 - 0.1) + 0.1 },
                    { sem: "green", label: "SHA-244", score: Math.random() * (1 - 0.1) + 0.1 },
                    { sem: "green", label: "SHA-384", score: Math.random() * (1 - 0.1) + 0.1 },
                    { sem: "green", label: "SHA_512", score: Math.random() * (1 - 0.1) + 0.1 },
                    { sem: "green", label: "SHA1", score: Math.random() * (1 - 0.1) + 0.1 },
                    { sem: "green", label: "SHA3", score: Math.random() * (1 - 0.1) + 0.1 },
                    { sem: "green", label: "BLAKE2", score: Math.random() * (1 - 0.1) + 0.1 },
                    { sem: "green", label: "BLAKE3", score: Math.random() * (1 - 0.1) + 0.1 },
                    { sem: "green", label: "MD5", score: Math.random() * (1 - 0.1) + 0.1 },
                    {
                        sem: "green",
                        label: "Not Recommended",
                        score: Math.random() * (0.5 - 0.1) + 0.1,
                    },
                ],
            };


            Custom.bulletBarList("algoritmos", algoritmos.apps);


            ChartLib.palettes.custom = ["#2EBDCB","#EAC23E","#A4DF23","#007DC5","#85BB03","#624034","#F87B1F","#51CBE3","#EAC23E","#F35B34","#D42A37","#9BD6D2"];
            ChartLib.doughnut("use_chart", data.use, {
                xvalues: "name",
                yvalues: ["count"],
                yfmt: "n",
                legend: false,
                responsive: true,
                palette: "custom",
            });
            const total2 = data.use.reduce(
                (sum, value) =>
                    typeof value.count == "number" ? sum + value.count : sum,
                0
            );
            $("#use_actual").html("");
            for (let i = 0; i < data.use.length; i++) {
                $("#use_actual").append(
                    "<div class='rectangle' style='background-color:" +
                        ChartLib.palettes.custom[i] +
                        ";'>" +
                        "</div>" +
                        "<h4 class='m-0'>" +
                        data.use[i].name +
                        "&nbsp;</h4><h3 class='m-0'>" +
                        ((data.use[i].count * 100) / total2).toFixed(2) +
                        "%</h3>" +
                        "<br>"
                );
            }
            ChartLib.palettes.custom = ["#2EBDCB","#EAC23E","#A4DF23","#007DC5","#85BB03","#624034","#F87B1F","#51CBE3","#EAC23E","#F35B34","#9BD6D2"];
            ChartLib.bar("topinstances_chart", data.instances, {
                xvalues: "type",
                yvalues: ["actual"],
                yfmt: "p100",
                xfmt: "s",
                xrange: [0, 100],
                palette: "custom",
            });


            $(".updatetext").css("color","black");
            $(".updatetext").text("Última actualización: " + fmt("dDMYHMs")(moment()));
        },
        error: (a, b, c) => {
            // debugger;
        },
    });
}

function setupDash() {}

function loopDash() {
    setupDash();
    makeDash();
    setInterval(makeDash, 5000);
}


