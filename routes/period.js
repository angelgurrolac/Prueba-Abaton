const moment = require("moment-timezone");

const _dash = 1;
const _report = 2;

const _meta = [
    {
        label: "Hoy (Dia actual)",
        code: "day",
        start: "now/d",
        end: "now",
        interval: "5m",
        format: "dHm",
        momentSubstract: "0",
        momentSubstractCode: "days",
        applies: _dash | _report
    },
    {
        label: "Semana",
        code: "week",
        start: "now-7d/d",
        end: "now",
        interval: "1h",
        format: "ddHa",
        momentSubstract: "0",
        momentSubstractCode: "weeks",
        applies: _dash | _report
    },
    {
        label: "Mes actual (Default)",
        code: "mon0",
        start: "now/M",
        end: "now",
        interval: "4h",
        format: "dMD",
        default: true,
        momentSubstract: "0",
        momentSubstractCode: "months",
        applies: _dash | _report
    },
    {
        label: "Mes anterior",
        code: "mon1",
        start: "now-1M/M",
        end: "now/M",
        interval: "4h",
        format: "dMD",
        momentSubstract: "1",
        momentSubstractCode: "months",
        applies: _dash | _report
    },
    {
        label: "Ultimos 3 meses",
        code: "mon3",
        start: "now-3M/M",
        end: "now/M",
        interval: "12h",
        format: "dMD",
        momentSubstract: "3",
        momentSubstractCode: "months",
        applies: _dash | _report
    },
    {
        label: "Año",
        code: "year",
        start: "now-1y/d",
        end: "now",
        interval: "1d",
        format: "dMD",
        momentSubstract: "0",
        momentSubstractCode: "years",
        applies: _dash | _report
    },
    {
        label: "Rango de días",
        code: "cust",
        interval: "1h",
        format: "dMD",
        applies: _dash | _report
    },
    {
        label: "Rango de horas",
        code: "cust2",
        interval: "5m",
        format: "dHm",
        applies: _report
    }
];

exports.select = report => {
    const f = report ? _report : _dash;
    return _meta
        .filter(o => {
            return (o.applies & f) != 0;
        })
        .map(o => ({
            code: o.code,
            label: o.label,
            format: o.format,
            default: !!o.default,
            momentSubstract: o.momentSubstract,
            momentSubstractCode: o.momentSubstractCode
        }));
};

exports.intervals = () => {
    return [
        { label: "1 hora", code: "1h", duration: 60 * 60 * 1000 },
        { label: "2 horas", code: "2h", duration: 2 * 60 * 60 * 1000 },
        { label: "4 horas", code: "4h", duration: 4 * 60 * 60 * 1000 },
        { label: "8 horas", code: "8h", duration: 8 * 60 * 60 * 1000 },
        { label: "12 horas", code: "12h", duration: 12 * 60 * 60 * 1000 },
        { label: "día", code: "1d", duration: 24 * 60 * 60 * 1000 },
        { label: "semana", code: "7d", duration: 7 * 24 * 60 * 60 * 1000 }
    ];
};

exports.filter = f => {
    f = f ?? "mon0";
    if (/^cust\|/.test(f)) {
        const [_, start, end] = f.split("|");
        return {
            range: {
                gte: moment(start).toDate(),
                lt: moment(end).add(1, "day").toDate()
            },
            interval: "1h"
        };
    } else if (/^cust2\|/.test(f)) {
        const [_, date, start, end] = f.split("|");
        return {
            range: {
                gte: moment(date + "T" + start)
                    .tz("America/Mexico_City")
                    .toDate(),
                lt: moment(date + "T" + end)
                    .tz("America/Mexico_City")
                    .add(1, "minute")
                    .toDate()
            },
            interval: "5m"
        };
    } else {
        const p = _meta.find(o => o.code == f) ?? _meta.find(o => o.default);
        return {
            range: {
                gte: p.start,
                lt: p.end
            },
            interval: p.interval
        };
    }
};
