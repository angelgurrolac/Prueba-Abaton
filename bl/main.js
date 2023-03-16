const moment = require("moment");
const self = exports;

exports.data = async () => {
    const status = ["#33B168", "#FF8E0E"];
    const status1 = (Math.random() * (100 - 80) + 80).toFixed(1);
    const status2 = (Math.random() * (100 - 80) + 80).toFixed(1);
    const status3 = (Math.random() * (100 - 80) + 80).toFixed(1);
    const status4 = (Math.random() * (100 - 80) + 80).toFixed(1);
    const status5 = (Math.random() * (100 - 80) + 80).toFixed(1);
    const status6 = (Math.random() * (100 - 80) + 80).toFixed(1);

    const data = [
        { ID: 1, Name: "Santa Fe", Status: status1, color: status[status1 > 85 ? 0 : 1]},
        { ID: 2, Name: "Reforma", Status: status2, color: status[status2 > 85 ? 0 : 1]},
        { ID: 3, Name: "Tlalpan", Status: status3, color: status[status3 > 85 ? 0 : 1]},
        { ID: 4, Name: "Torre KOI", Status: status4, color: status[status4 > 85 ? 0 : 1]},
        { ID: 5, Name: "Call Center", Status: status5, color: status[status5 > 85 ? 0 : 1]},
        { ID: 5, Name: "Torre sur", Status: status6, color: status[status6 > 85 ? 0 : 1]}
    ];
    data.locations = 0;
    if (status1 < 85) {
        data.locations = data.locations + 1;
    }
    if (status2 < 85) {
        data.locations = data.locations + 1;
    }
    if (status3 < 85) {
        data.locations = data.locations + 1;
    }
    if (status4 < 85) {
        data.locations = data.locations + 1;
    }
    if (status5 < 85) {
        data.locations = data.locations + 1;
    }
    if (status6 < 85) {
        data.locations = data.locations + 1;
    }
    
    return data;
};

exports.get = async (id) => {
    const status = ["#33B168", "#FF8E0E"];
    const status1 = (Math.random() * (100 - 70) + 70).toFixed(1);
    const status2 = (Math.random() * (100 - 70) + 70).toFixed(1);
    const status3 = (Math.random() * (100 - 70) + 70).toFixed(1);
    const status4 = (Math.random() * (100 - 70) + 70).toFixed(1);
    const status5 = (Math.random() * (100 - 70) + 70).toFixed(1);

    const data = [
        { ID: 1, Name: "Santa Fe", Status: status1, color: status[status1 > 85 ? 0 : 1]},
        { ID: 2, Name: "Reforma", Status: status2, color: status[status2 > 85 ? 0 : 1]},
        { ID: 3, Name: "Tlalpan", Status: status3, color: status[status3 > 85 ? 0 : 1]},
        { ID: 4, Name: "Torre KOI", Status: status4, color: status[status4 > 85 ? 0 : 1]},
        { ID: 5, Name: "Call Center", Status: status5, color: status[status5 > 85 ? 0 : 1]},
    ];

    return data;
};

