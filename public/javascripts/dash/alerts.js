/* Formatting function for row details - modify as you need */
var _tables = [];
function format(d,id) {
    const style = [];
    $("#" + id + " tbody tr")
        .first()
        .find("td")
        .each((i, o) => {
            style.push(`width: style="width: ${o.offsetWidth}px"`);
        });
    var s = "";
    if (d.frequency.length > 1) {
        s += `
            <table class="dataTable">
                <tbody>
                <tr>
                    <td ${style[0]}></td>
                    <td ${style[1]}>${d.frequency[1]}</td>
                    <td ${style[2]}>${fmtPct(d.ram_used[1])}</td>
                    <td ${style[3]}>${fmtPct(d.cpu_used[1])}</td>
                    <td ${style[4]}>${fmtPct(d.radio_used[1])}</td>
                    <td ${style[5]}></td>
                </tr>
                </tbody>
            </table>`;
    }
    s += "<div>Otros detalles<ul><li>Issues y soluciones</li><li>Lista de usuarios</li></ul></div>";
    return s;
}

function setupTables(){
    $(document).ready(function () {
        table("ap70");
        table("apdrop");
        table("apred");
        table("apyellow");
        table("apvip");
        
    });
}

function fmtPct(x) {
    return Math.round(x * 100) + "%";
}

function table(id){
    _tables[id] = $(`#${id}`).DataTable({
        dom: "<lf<t>p>",
        ajax: "/dash/ap/data",
        lengthMenu: [
            [5, 10, 25, 50, -1],
            [5, 10, 25, 50, "Todos"]
        ],
        columns: [
            { data: "name" },
            { data: "frequency", render: o => o[0] },
            { data: "ram_used", render: o => fmtPct(o[0]) },
            { data: "cpu_used", render: o => fmtPct(o[0]) },
            { data: "radio_used", render: o => fmtPct(o[0]) },
            {
                className: "dt-control",
                orderable: false,
                data: null,
                defaultContent: ""
            }
        ],
        order: [[1, "asc"]]
    });
    
    // _tables[id].destroy();

    $(`#${id} tbody`).on("click", "td.dt-control", function () {
        var tr = $(this).closest("tr");
        var row = _tables[id].row(tr);

        if (row.child.isShown()) {
            row.child.hide();
            tr.removeClass("shown");
        } else {
            row.child(format(row.data(),id)).show();
            tr.addClass("shown");
        }
    });
}
