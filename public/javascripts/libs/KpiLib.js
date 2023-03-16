const KpiLib = {
    format: {
        default: id => {
            var f = [
                [/_amount$/, "ch6"],
                [/_count$/, "h6"],
                [/^avail_/, "p1"]
            ].find(o => o[0].test(id));
            return f ? f[1] : "n";
        }
    },

    update: data => {
        var ids = Array.from($("#dash *"))
            .filter(o => o.id != "")
            .map(o => o.id);
        for (var id of ids) {
            var o = data;
            for (var k of id.split("_")) {
                if (o[k]) o = o[k];
                else {
                    o = null;
                    break;
                }
            }
            if (o != null) {
                let v = fmt(KpiLib.format.default(id))(o);
                v = v.replace(/([%\$])/, "<small>$1</small>");
                $("#" + id).html(v);
            }
        }
    }
};
