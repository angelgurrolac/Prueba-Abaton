var val = $(".error").html();

if (val != "") {
    $.notify(
        {
            message: val,
        },
        {
            type: "danger",
            allow_dismiss: false,
            animate: {
                enter: "animated fadeInRight faster",
                exit: "animated fadeOutRight faster",
                delay: "3000",
            },
        }
    );
}
$(document).ready(function () {
    if ($(window).width() < 1300) {
        $(".img-login").addClass("d-none");
    } else {
        $(".img-login").removeClass("d-none");
    }
});
