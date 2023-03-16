jQuery(function () {
    $(".countInteger").each(function () {
        $(this)
            .prop("Counter", 0)
            .animate(
                {
                    Counter: $(this).text()
                },
                {
                    duration: 4000,
                    easing: "swing",
                    step: function (now) {
                        $(this).text(Math.ceil(now).toLocaleString("en-US"));
                    }
                }
            );
    });
    $(".countDecimal").each(function () {
        $(this)
            .prop("Counter", 0)
            .animate(
                {
                    Counter: $(this).text()
                },
                {
                    duration: 4000,
                    easing: "swing",
                    step: function (now) {
                        $(this).text(Math.round(now * 10) / 10);
                    }
                }
            );
    });
    $(".countIntegerP").each(function () {
        $(this)
            .prop("Counter", 0)
            .animate(
                {
                    Counter: $(this).text().slice(0, -1)
                },
                {
                    duration: 4000,
                    easing: "swing",
                    step: function (now) {
                        $(this).text(Math.ceil(now).toLocaleString("en-US") + "%");
                    }
                }
            );
    });

    $(".countDecimalP").each(function () {
        $(this)
            .prop("Counter", 0)
            .animate(
                {
                    Counter: $(this).text().slice(0, -1)
                },
                {
                    duration: 4000,
                    easing: "swing",
                    step: function (now) {
                        $(this).text(Math.round(now * 10) / 10 + "%");
                    }
                }
            );
    });

    $(".countDecimalPDelta").each(function () {
        var delta = $(this).text().slice(0, 1);
        $(this)
            .prop("Counter", 0)
            .animate(
                {
                    Counter: $(this).text().slice(1, -1)
                },
                {
                    duration: 4000,
                    easing: "swing",
                    step: function (now) {
                        $(this).text("" + delta + (Math.round(now * 10) / 10).toFixed(2) + "%");
                    }
                }
            );
    });

    $(".countIntegerMin").each(function () {
        $(this)
            .prop("Counter", 0)
            .animate(
                {
                    Counter: $(this).text().slice(0, -3)
                },
                {
                    duration: 4000,
                    easing: "swing",
                    step: function (now) {
                        $(this).text(Math.ceil(now).toLocaleString("en-US") + " min");
                    }
                }
            );
    });
});
