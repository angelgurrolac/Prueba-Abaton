function updateteams() {
    teams();
    setInterval(teams, 60 * 1000);
}

function teams() {
    if ($(window).width() < 1200 && $(window).width() > 990) {
        $(".flex-nowrap").removeClass("te");
     }

     $( window ).resize(function() {
        if ($(window).width() < 1200 && $(window).width() > 990) {
            $(".flex-nowrap").removeClass("te");
        }
    });
    // $("#spinner-div").show();
    $.ajax({
        method: "post",
        success: data => {
            if ($("#teams_health").length) {
                $("#teams_jitter").text(fmt("n1")(Math.random(1000 - 1)) + "ms");
                $("#teams_latency").text(fmt("n1")(Math.random(10000 - 1)) + "ms");
                $("#teams_loss").text(fmt("p102")(Math.random() * (2 - 0.1) + 0.1));
                ChartLib.circle("teams_health", Math.floor(Math.random() * (100 - 95) + 95), {
                    mode: "continuous",
                    fontSize: 16
                });
                $("#teams_alerts").text( Math.floor(Math.random() * (10 - 2) + 2));
            }
            if ($("#ms365_health").length) {
                $("#ms365_jitter").text(fmt("n1")(Math.random(1000 - 1)) + "ms");
                $("#ms365_latency").text(fmt("n1")(Math.random(1000 - 1)) + "ms");
                $("#ms365_loss").text(fmt("p102")(Math.random() * (2 - 0.1) + 0.1));
                ChartLib.circle("ms365_health", Math.floor(Math.random() * (100 - 95) + 95), {
                    mode: "continuous",
                    fontSize: 16
                });
                $("#ms365_alerts").text(Math.floor(Math.random() * (10 - 2) + 2));
            }
            if ($("#webex_health").length) {
                $("#webex_jitter").text(fmt("n1")(Math.random(1000 - 1)) + "ms");
                $("#webex_latency").text(fmt("n1")(Math.random(1000 - 1)) + "ms");
                $("#webex_loss").text(fmt("p102")(Math.random() * (2 - 0.1) + 0.1));
                ChartLib.circle("webex_health", Math.floor(Math.random() * (100 - 95) + 95), {
                    mode: "continuous",
                    fontSize: 16
                });
                $("#webex_alerts").text(Math.floor(Math.random() * (10 - 2) + 2));
            }

            if ($("#skype_health").length) {
                $("#skype_jitter").text(fmt("n1")(Math.random(1000 - 1)) + "ms");
                $("#skype_latency").text(fmt("n1")(Math.random(1000 - 1)) + "ms");
                $("#skype_loss").text(fmt("p102")(Math.random() * (2 - 0.1) + 0.1));
                ChartLib.circle("skype_health", Math.floor(Math.random() * (100 - 95) + 95), {
                    mode: "continuous",
                    fontSize: 16
                });
                $("#skype_alerts").text(Math.floor(Math.random() * (10 - 2) + 2));
            }

            if ($("#zoom_health").length) {
                $("#zoom_jitter").text(fmt("n1")(Math.random(1000 - 1)) + "ms");
                $("#zoom_latency").text(fmt("n1")(Math.random(1000 - 1)) + "ms");
                $("#zoom_loss").text(fmt("p102")(Math.random() * (2 - 0.1) + 0.1));
                ChartLib.circle("zoom_health", Math.floor(Math.random() * (100 - 95) + 95), {
                    mode: "continuous",
                    fontSize: 16
                });
                $("#zoom_alerts").text(Math.floor(Math.random() * (10 - 2) + 2));
            }

            $(".usersvip").text(Math.floor(Math.random() * (100 - 20) + 20));
            $(".usersvipbad").text(Math.floor(Math.random() * (5 - 1) + 1));
            $(".users").text(Math.floor(Math.random() * (1000 - 200) + 200));
            $(".usersbad").text(Math.floor(Math.random() * (5 - 1) + 1));
            $(".updatetext").text("Última actualización: " + fmt("dDMYHms")(moment()));
        },
        // complete: function () {
        //     $("#spinner-div").hide(); //Request is complete so hide spinner
        // },
        error: (a, b, c) => {}
    });
}
