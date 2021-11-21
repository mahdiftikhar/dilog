const mysql = require("mysql2");

const HOST = "localhost";
const USER = "root";
const DATABASE = "dilog";
const PASSWORD = "golfishere45";

const pool = mysql.createPool({
    host: HOST,
    user: USER,
    database: DATABASE,
    password: PASSWORD,
});

module.exports = pool.promise();
