function loopDash() {
    setupDash();
}

function setupDash() {
    $("#grid").DataTable({
        order: [[0, "desc"]]
    });
}
