const { Client, Pool } = require("pg");

let connection;

if (process.env.ENV_MODE === "prod") {
  connection = new Client({
    connectionString: process.env.DB_URI,
    // "postgres://dknqzwoeglvjnz:c52eb64e0abfa2def4dac97da255c2bc9108d19989773edbe6fc65adc9c0a869@ec2-52-20-166-21.compute-1.amazonaws.com:5432/d666rujpar8n53",
    ssl: {
      rejectUnauthorized: false,
    },
  });
} else {
  connection = new Pool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT || 5432,
  });
}

connection.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
});
module.exports = connection;
