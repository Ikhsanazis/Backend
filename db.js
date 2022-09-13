require("dotenv").config();
const { Client, Pool } = require("pg");

let connection;

if (process.env.ENV_MODE === "prod") {
  connection = new Client({
    connectionString: process.env.DB_URI,
    // c43a7c8aef9c9a3e3846c8a09b190b327ccf0cbc
    ssl: {
      rejectUnauthorized: false,
    },
  });
} else {
  connection = new Pool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: process.env.DB_PORT || 5432,
  });
}


const connect = async () => {
  try {
    const response = await connection.connect();
    if (response) console.log("Connect to database");
  } catch (err) {
    console.log(err);
  }
};

connect();
module.exports = connection;
