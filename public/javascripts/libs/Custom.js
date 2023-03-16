const _tables = {};

const Custom = {
    bulletList: (id, data) => {
        const o = $("#" + id);
        o.empty();
        const t = $("<table><thead><tr><th></th><th></th><tbody></table>");
        t.addClass("bullet-list");
        o.append(t);
        _tables[id] = t.DataTable({
            dom: "t",
            columns: [
                {
                    data: "sem",
                    className: "dt-body-right",
                    render: o => `<div class="sem ${o}"></div>`
                },
                { data: "label" }
            ],
            drawCallback: _settings => {
                $(`#${id} thead`).remove();
            }
        });

        makeTable(id, data);
    },
    bulletList2: (id, data) => {
        const o = $("#" + id);
        o.empty();
        const t = $("<table><thead><tr><th></th><th></th><th></th><tbody></table>");
        t.addClass("bullet-list");
        o.append(t);
        _tables[id] = t.DataTable({
            dom: "t",
            columns: [
                {
                    data: "sem",
                    className: "dt-body-right",
                    render: o => `<div class="sem ${o}"></div>`
                },
                { data: "label" },
                { data: "status" }
            ],
            drawCallback: _settings => {
                $(`#${id} thead`).remove();
            }
        });

        makeTable(id, data);
    },
    bulletBarList: (id, data) => {
        const o = $("#" + id);
        o.empty();
        const t = $("<table><thead><tr><th></th><th></th><th></th><th></th><tbody></table>");
        t.addClass("bullet-list");
        o.append(t);
        _tables[id] = t.DataTable({
            dom: "t",
            columns: [
                {
                    data: "sem",
                    className: "dt-body-right",
                    render: o => {
                        return `<div class="sem ${o}"></div>`;
                    }
                },
                { data: "label" },
                { data: "score", render: fmt("p") },
                {
                    data: "score",
                    render: o => `<div style="width: 150px"><div class="bar" style="width: ${o * 100}%"></div>`
                }
            ],
            drawCallback: _settings => {
                $(`#${id} thead`).remove();
            }
        });

        makeTable(id, data);
    },
    bulletBarListMB: (id, data) => {
        const o = $("#" + id);
        o.empty();
        const t = $("<table><thead><tr><th></th><th></th><th></th><th></th><tbody></table>");
        t.addClass("bullet-list");
        o.append(t);
        _tables[id] = t.DataTable({
            dom: "t",
            columns: [
                {
                    data: "sem",
                    className: "dt-body-right",
                    render: o => {
                        return `<div class="sem ${o}"></div>`;
                    }
                },
                { data: "label" },
                { data: "score", render: o=>o+" MB" },
                {
                    data: "score",
                    render: o => `<div style="max-width:150px;width: 150px"><div class="bar" style="width: ${o}%"></div>`
                }
            ],
            drawCallback: _settings => {
                $(`#${id} thead`).remove();
            }
        });

        makeTable(id, data);
    },
    multipleBulletList: (id, data) => {
        const o = $("#" + id);
        o.empty();
        const t = $("<table><thead><tr><th>Agent</th><th>M</th><th>W</th><th>F</th><tbody></table>");
        t.addClass("bullet-list");
        o.append(t);
        _tables[id] = t.DataTable({
            dom: "t",
            columns: [
                { data: "label" },
                {
                    data: "m",
                    className: "dt-body-right",
                    render: o => `<div class="sem ${o}"></div>`
                },
                {
                    data: "w",
                    className: "dt-body-right",
                    render: o => `<div class="sem ${o}"></div>`
                },
                {
                    data: "f",
                    className: "dt-body-right",
                    render: o => `<div class="sem ${o}"></div>`
                }
            ]
        });

        makeTable(id, data);
    },
    bulletListELK: (id, data) => {
        const o = $("#" + id);
        o.empty();
        const t = $("<table><thead><tr><th></th><th></th><th></th><th></th><th></th><th></th><th></th><tbody></table>");
        t.addClass("bullet-list");
        o.append(t);
        _tables[id] = t.DataTable({
            dom: "t",
            columns: [
                {
                    data: "sem",
                    className: "dt-body-right",
                    render: o => `<div class="sem ${o}"></div>`
                },
                { data: "label" },
                { data: "n1" },
                { data: "n2" },
                { data: "used" },
                { data: "total" },
                { data: "plus" }
            ],
            drawCallback: _settings => {
                $(`#${id} thead`).remove();
            }
        });

        makeTable(id, data);
    },
    bulletListAzure: (id, data) => {
        const o = $("#" + id);
        o.empty();
        const t = $("<table><thead><tr><th></th><th></th><th></th><th></th><tbody></table>");
        t.addClass("bullet-list");
        o.append(t);
        _tables[id] = t.DataTable({
            dom: "t",
            columns: [
                {
                    data: "sem",
                    className: "dt-body-right",
                    render: o => `<div class="sem ${o}"></div>`
                },
                { data: "label" },
                { data: "bytesin" },
                { data: "bytesout" }
            ],
            drawCallback: _settings => {
                $(`#${id} thead`).remove();
            }
        });

        makeTable(id, data);
    }
};

function makeTable(id, data) {
    var table = _tables[id];
    if (table) {
        const page = table.page();
        table.clear();
        table.rows.add(data);
        table.draw();
        table.page(page);
        table.draw("page");
    }
}
