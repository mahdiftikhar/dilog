const mysql = require("mysql2");

const HOST = "localhost";
const USER = "root";
const DATABASE = "dilog";
const PASSWORD = "cumdump";

let pool;
// let connection_dict = process.env.JAWSDB_URL;

if (process.env.JAWSDB_URL) {
    // connection_dict["dateStrings"] = true;
    pool = mysql.createPool(process.env.JAWSDB_URL);
} else {
    pool = mysql.createPool({
        host: HOST,
        user: USER,
        database: DATABASE,
        password: PASSWORD,
        dateStrings: true,
    });
}
module.exports = pool.promise();
