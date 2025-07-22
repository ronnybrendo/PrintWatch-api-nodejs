const axios = require('axios');
require('dotenv').config();

async function getToken() {
    const url = `${process.env.OAUTH_URL}/cisspoder-auth/oauth/token`; // Use environment variable or default
    const params = new URLSearchParams();

    params.append('username', process.env.OAUTH_USERNAME); // Use environment variable or default
    params.append('password', process.env.OAUTH_PASSWORD); // Use environment variable or default
    params.append('grant_type', process.env.OAUTH_GRANT_TYPE ); // Use environment variable or default
    params.append('client_secret', process.env.OAUTH_CLIENT_SECRET); // Use environment variable or default
    params.append('client_id', process.env.OAUTH_CLIENT_ID); // Use environment variable or default

    try {
        const response = await axios.post(url, params, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });
        return response.data; // O objeto contendo o token
    } catch (error) {
        throw new Error(error.response ? error.response.data : error.message);
    }
}

module.exports = { getToken };