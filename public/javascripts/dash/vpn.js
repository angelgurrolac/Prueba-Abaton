function updatevpn2() {
    setInterval(licencias, 3000);
    setInterval(vpnbar, 3000);
    setInterval(bytes, 3000);
}

function licencias() {
    $.ajax({
        method: "POST",
        url: "/dash/vpn/licencias",
        cache: false,
        success: function (data) {
            ChartLib.palettes.custom = ["#3CBA9F", "#3E95CD", "#C45850"];
            $("#data").html("");
            for (let i = 0; i < data.length; i++) {
                $("#data").append(
                    "<div class='bullet' style='background-color:" +
                        ChartLib.palettes.custom[i] +
                        ";'>" +
                        "</div>" +
                        "<h5>" +
                        data[i].type +
                        "&nbsp;&nbsp;</h5><h3>" +
                        Math.round(data[i].actual) +
                        "</h3>" +
                        "<br>"
                );
            }
            ChartLib.bar("chartlicencias", data, {
                xvalues: "type",
                yvalues: ["actual"],
                yfmt: "n",
                yrange: [0, 120],
                palette: "custom",
            });
        },
        error: function (a, b, c) {
            debugger;
        },
    });
}

function vpnbar() {
    $.ajax({
        method: "POST",
        url: "/dash/vpn/radar",
        cache: false,
        success: function (data) {
            ChartLib.palettes.custom = [
                "#3e95cd",
                "#8e5ea2",
                "#7896D2",
                "#C5AA0A",
                "#c45850",
                "#e8c3b9",
                "#3cba9f",
            ];
            $("#datas").html("");
            for (let i = 0; i < data.length; i++) {
                $("#datas").append(
                    "<div class='bullet' style='background-color:" +
                        ChartLib.palettes.custom[i] +
                        ";'>" +
                        "</div>" +
                        "<h5>" +
                        data[i].type +
                        "&nbsp;&nbsp;</h5><h3>" +
                        Math.round(data[i].actual) +
                        "</h3>" +
                        "<br>"
                );
            }
            ChartLib.pie("chartvpn", data, {
                xvalues: "type",
                yvalues: ["actual"],
                yfmt: "n",
                legend: false,
                palette: "custom",
            });
        },
        error: function (a, b, c) {
            debugger;
        },
    });
}

function bytes() {
    const d = new Date();
    var data = new Array(48).fill().map((_o, i) => {
        const o = {
            date: new Date(
                d.getFullYear(),
                d.getMonth(),
                d.getDate(),
                i,
                0,
                0
            ).valueOf(),
            bytesin: Math.floor((Math.random() * (0.1 - 0.5) + 0.5) * 100),
            bytesout: Math.floor((Math.random() * (0.3 - 0.8) + 0.8) * 100)
        };
        return o;
    });

    ChartLib.palettes.custom = ["#3CBA9F", "#3E95CD", "#C45850"];
    ChartLib.line("vpnin", data, {
        xvalues: "date",
        yvalues: ["bytesin","bytesout"],
        yfmt: "n",
        yrange: [0, 100],
        palette: "custom",
    });

    ChartLib.palettes.custom = ["#3E95CD", "#C45850"];
    ChartLib.line("vpnout", data, {
      xvalues: "date",
      yvalues: ["bytesout","bytesin"],
      yfmt: "n",
      yrange: [0, 100],
      palette: "custom",
  });
}
