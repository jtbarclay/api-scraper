require('dotenv').config();
const axios = require('axios');


const endpointArrayTest = ['/billsss.json', '/bills.json', '/images/1.json', '/imagessss/1.json'];

// '/images/1.json', '/bills.json', '/get_design_by_ids_of_tenant_and_design/1/2.json'

// axios.defaults.headers.common = { 'Authorization': `Bearer ${process.env.BEARER_TOKEN}` }

async function hitEndpoints(endpoints) {
    for (let i = 0; i < endpoints.length; i++) {
        await axios.get('https://dev-api.rapidinterface.com' + endpoints[i], {headers: {'Authorization': `Bearer ${process.env.BEARER_TOKEN}`}})
            .then( (result) => {
                console.log(result.request.path + ' WORKING ', result.data);
            })
            .catch( (err) => {
                if (err.isAxiosError) {
                    console.log(err.response.request.path + ' NOT WORKING');
                }
            })
    }
}

hitEndpoints(endpointArrayTest);