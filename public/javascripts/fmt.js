const _tz = "America/Mexico_City";

function fmt(f) {
    return _fmt[f] || (o => o);
}

const _fmt = {
    n: value => _fmt.N(value, 0),
    n1: value => _fmt.N(value, 1),
    n1_ms: value => _fmt.N(value, 1) + " ms",
    n2: value => _fmt.N(value, 2),
    n2_ms: value => _fmt.N(value, 2) + " ms",
    c: value => "$" + _fmt.N(value, 0),
    ch3: value => "$" + _fmt.H(value, 1e3),
    ch6: value => "$" + _fmt.H(value, 1e6),
    p: value => _fmt.P(value, 0),
    p1: value => _fmt.P(value, 1),
    p2: value => _fmt.P(value, 2),
    p100: value => _fmt.N(value, 0) + "%",
    p102: value => _fmt.N(value, 2) + "%",
    h3: value => _fmt.H(value, 1e3),
    h6: value => _fmt.H(value, 1e6),
    ah3: value => _fmt.H(Math.abs(value), 1e3),
    ah6: value => _fmt.H(Math.abs(value), 1e6),
    dHm: value => moment(value).tz(_tz).format("HH:mm"),
    ddHa: value => moment(value).tz(_tz).format("ddd DD"),
    dMD: value => moment(value).tz(_tz).format("MMM-DD"),
    dDMy: value => moment(value).tz(_tz).format("DD/MM/yyyy"),
    dDMYHm: value => moment(value).tz(_tz).format("DD/MM/yyyy HH:mm"),
    dDMYHms: value => moment(value).tz(_tz).format("DD/MM/yyyy HH:mm:ss"),
    noise: value => _fmt.N(value, 0) + " dBm",
    day: value => moment(value).tz(_tz).format("dddd"),
    N: (value, digits) => {
        return new Intl.NumberFormat("es-MX", {
            minimumFractionDigits: digits,
            maximumFractionDigits: digits
        }).format(value);
    },
    P: (value, digits) => {
        return _fmt.N(value * 100, digits) + "%";
    },
    H: (value, max) => {
        if (value == null || value == undefined) return "-";
        const suffix = ["", " K", " M", "G"];
        let k = 0;
        while (value >= max && k < suffix.length) {
            value /= 1e3;
            k++;
        }
        return _fmt.N(value, 0) + suffix[k];
    },
    MB: value => {
        const decimals = 2;
        const k = 1024;
        const dm = decimals < 0 ? 0 : decimals;
        const sizes = ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
        value = Math.round(value);
        const i = value ? Math.floor(Math.log(value) / Math.log(k)) : 0;
        const s = parseFloat((value / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
        return s;
    },
    sHm: value => value.toString().padStart(2, "0") + ":00",
    sDOW: value => ["Do", "Lu", "Ma", "Mi", "Ju", "Vi", "Sá"][value]
};

if (typeof module !== "undefined" && module.exports) module.exports = fmt;
