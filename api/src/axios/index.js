require('dotenv').config();
const axios = require('axios');
const { DB_API_KEY } = process.env;
const axiosInstance = axios.create({
  headers: {
    'x-api-key': `${DB_API_KEY}`,
  },
});

module.exports = axiosInstance;
