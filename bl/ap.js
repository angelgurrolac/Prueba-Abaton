const moment = require("moment");
const self = exports;

exports.data = async () => {
    const status = ["#33B168", "#FF8E0E", "#33B168"];
    const data = [
        { ID: 1, Name: "Santa Fe", Status: (Math.random() * (100 - 70) + 70).toFixed(1), color: status[Math.floor((Math.random() * 3))]},
        { ID: 2, Name: "Reforma", Status:  (Math.random() * (100 - 70) + 70).toFixed(1), color: status[Math.floor((Math.random() * 3))]  },
        { ID: 3, Name: "Tlalpan", Status:  (Math.random() * (100 - 70) + 70).toFixed(1), color: status[Math.floor((Math.random() * 3))]  },
        { ID: 4, Name: "Torre KOI", Status:  (Math.random() * (100 - 70) + 70).toFixed(1), color: status[Math.floor((Math.random() * 3))]  },
        { ID: 5, Name: "Call Center", Status:  (Math.random() * (100 - 70) + 70).toFixed(1), color: status[Math.floor((Math.random() * 3))]  },
        { ID: 6, Name: "Torre Sur", Status:  (Math.random() * (100 - 70) + 70).toFixed(1), color: status[Math.floor((Math.random() * 3))]  }
    ];
    return data;
};

exports.get = async (id) => {
    const status = ["#33B168", "#FF8E0E", "#33B168"];
    const data = [
        { ID: 1, Name: "Santa Fe", Status: (Math.random() * (100 - 70) + 70).toFixed(1), color: status[Math.floor((Math.random() * 3))]},
        { ID: 2, Name: "Reforma", Status:  (Math.random() * (100 - 70) + 70).toFixed(1), color: status[Math.floor((Math.random() * 3))]  },
        { ID: 3, Name: "Tlalpan", Status:  (Math.random() * (100 - 70) + 70).toFixed(1), color: status[Math.floor((Math.random() * 3))]  },
        { ID: 4, Name: "Torre KOI", Status:  (Math.random() * (100 - 70) + 70).toFixed(1), color: status[Math.floor((Math.random() * 3))]  },
        { ID: 5, Name: "Call Center", Status:  (Math.random() * (100 - 70) + 70).toFixed(1), color: status[Math.floor((Math.random() * 3))]  },
        { ID: 6, Name: "Torre Sur", Status:  (Math.random() * (100 - 70) + 70).toFixed(1), color: status[Math.floor((Math.random() * 3))]  }
    ];
    const building = data.find(o => o.ID == id);
    return building;
};