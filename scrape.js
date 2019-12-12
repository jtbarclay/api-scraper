// imports
require('dotenv').config();
const axios = require('axios');
const cheerio = require('cheerio');
let express = require('express');
const bodyParser = require('body-parser');

// express setup
const app = express();
const PORT = 5000;
app.use(express.static('./'));
app.use(bodyParser.urlencoded({extended: true}));

// auth
let BEARER_TOKEN = '';
axios.defaults.headers.common = { 'Authorization': `Bearer ${BEARER_TOKEN}` }

const rows = [];
const results = [];

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
        $('.route_row').each(function (i, elem) {
            if ($(':nth-child(2)', this).text() == '\n    GET\n  ') {
                rows.push($(':nth-child(3)', this).text().replace('\n    ', '').replace(':id', '1').replace('(.:format)', '.json').replace('\n  ', ''));
            }
        });
        // console.log(rows);
        // rows.forEach(item => console.log(item));
        return rows;
    } catch (err) {
        console.log(err);
    }
}

async function hitEndpoints(endpoints) {
    for (let i = 0; i < endpoints.length; i++) {
        await axios.get('https://dev-api.rapidinterface.com' + endpoints[i])
            .then((result) => {
                results.push({ path: result.request.path, status: 'WORKING', data: result.data })
                // console.log(result.request.path + ' WORKING ', result.data);
            })
            .catch((err) => {
                if (err.isAxiosError) {
                    results.push({ path: err.response.request.path, status: 'NOT WORKING' })
                    // console.log(err.response.request.path + ' NOT WORKING');
                }
            })
    }
}

// async function run() {
//     await getResults()
//         .then( async () => {
//             await hitEndpoints(rows)
//                 .then( () => {
//                     console.log('done!');
//                     return results;
//                 })
//                 .catch( (err) => {
//                     console.log(err);
//                 })
//         })
//         .catch( (err) => {
//             console.log(err);
//         })
// }

app.post('/api/data', async (req, res) => {
    console.log('data route hit');
    console.log('req.body:', req.body);
    BEARER_TOKEN = req.body.token;
    await getResults()
        .then(async () => {
            await hitEndpoints(rows)
                .then(() => {
                    console.log('done!');
                    res.send(results);
                })
                .catch((err) => {
                    console.log(err);
                })
        })
        .catch((err) => {
            console.log(err);
        })

});

app.listen(PORT, () => {
    console.log('up and running on port', PORT);

});