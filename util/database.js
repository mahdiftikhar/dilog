const mysql = require("mysql2");

const HOST = "localhost";
const USER = "root";
const DATABASE = "dilog";
const PASSWORD = "Sas-251009";

const pool = mysql.createPool({
    host: HOST,
    user: USER,
    database: DATABASE,
    password: PASSWORD,
    dateStrings: true,
});

module.exports = pool.promise();
