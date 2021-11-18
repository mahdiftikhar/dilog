const mysql = require("mysql2");

const HOST = "localhost";
const USER = "root";
const DATABASE = "dilog";
const PASSWORD = "Halo89527fc4!";

const pool = mysql.createPool({
    host: HOST,
    user: USER,
    database: DATABASE,
    password: PASSWORD,
});

module.exports = pool.promise();
