    const mysql = require("mysql2");

const HOST = "localhost";
const USER = "root";
const DATABASE = "dilog";
<<<<<<< HEAD
const PASSWORD = "Sas-251009";
=======
const PASSWORD = "cumdump";
>>>>>>> e9039c0b487cb3475ff09d20f2886a2a713beeb4

const pool = mysql.createPool({
    host: HOST,
    user: USER,
    database: DATABASE,
    password: PASSWORD,
    dateStrings: true,
});

module.exports = pool.promise();
