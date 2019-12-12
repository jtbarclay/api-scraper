// imports
require('dotenv').config();
const axios = require('axios');

// url to scrape
const url = 'https://dev-api.rapidinterface.com/product_families.json';

// auth
const bearerToken = '';
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