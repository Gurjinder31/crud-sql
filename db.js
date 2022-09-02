const Pool = require('pg').Pool;
require('dotenv').config();

const pool = new Pool({
  user: process.env.USER_NAME,
  password: process.env.PASSWORD,
  host: 'localhost',
  port: 5432,
  database: 'movies',
});

module.exports = pool;
