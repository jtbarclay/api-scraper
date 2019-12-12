// imports
require('dotenv').config();
const axios = require('axios');
const cheerio = require('cheerio');

// auth
axios.defaults.headers.common = { 'Authorization': `Bearer ${process.env.BEARER_TOKEN}` }

const rows = [];

// fetch
const fetchData = async () => {
    try {
        await axios.get(process.env.API_URL);
    } catch (err) {
        // console.log(err.response.data);
        return cheerio.load(err.response.data);
    }
}

const getResults = async () => {
    try {
        const $ = await fetchData();
        $('.route_row').each(function(i, elem) {
            rows[i] = $(':nth-child(3)', this).text();
        });
        // rows.forEach(item => console.log(item));
        return rows;
    } catch (err) {
        console.log(err);
    }
}

module.exports = getResults;
