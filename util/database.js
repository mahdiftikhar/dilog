const mysql = require("mysql2");

const HOST = "localhost";
const USER = "root";
const DATABASE = "dilog";
const PASSWORD = "cumdump";

let pool;

if (process.env.JAWSDB_URL) {
    connection_dict["dateStrings"] = true;
    pool = mysql.createPool(connection_dict);
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
