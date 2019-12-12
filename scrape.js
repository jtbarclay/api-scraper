// imports
require('dotenv').config();
const axios = require('axios');

// url to scrape
const url = process.env.API_URL;

// auth
const bearerToken = process.env.BEARER_TOKEN;
axios.defaults.headers.common = { 'Authorization': `Bearer ${bearerToken}` }

// fetch
const fetchData = async () => {
    try {
        const result = await axios.get(url);
        return cheerio.load(result.data);
    } catch (err) {
        console.log(err);
    }
}

const getResults = async () => {
    try {
        const $ = await fetchData();
        const routes = $('.route_table');
        console.log(routes);
    } catch (err) {
        console.log(err);
    }
}

getResults();