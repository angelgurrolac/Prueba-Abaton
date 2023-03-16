const fs = require("fs");
const path = require("path");

const _words = fs
    .readFileSync(path.join(__dirname, "dic.txt"))
    .toString()
    .split(/[\n\r]+/)
    .filter(o => o.length >= 4 && o.length <= 9 && Array.from(o).every(p => p >= "a" && p <= "z"));

module.exports = () => {
    const pwlen = 24;
    let s;
    do {
        s = "";
        while (s.length < pwlen) {
            if (s != "") s += " ";
            s += _words[Math.floor(Math.random() * _words.length)];
        }
    } while (s.length > pwlen);
    return s;
};
