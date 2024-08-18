const Pool = require("pg").Pool;

const pool = new Pool({
  user: process.env.DB_USERNAME,
  host: "localhost",
  port: process.env.DB_PORT,
  database: "Todo",
  password: process.env.DB_PASSWORD,
});


module.exports = pool