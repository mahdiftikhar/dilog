const mysql = require("mysql2");

const HOST = "localhost";
const USER = "root";
const DATABASE = "dilog";
const PASSWORD = "mightywings42";

const pool = mysql.createPool({
    host: HOST,
    user: USER,
    database: DATABASE,
    password: PASSWORD,
    dateStrings: true,
});

module.exports = pool.promise();
