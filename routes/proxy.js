const axios = require("axios");

exports.call = async (endpoint, data) => {
    try {
        const res = await axios({
            method: "post",
            url: process.env.API_URL + endpoint,
            data: data ?? {}
        });
        return res.data;
    } catch (err) {
        console.error(endpoint);
        if (data !== undefined) console.error(JSON.stringify(data));
        console.error(err);
    }
};
