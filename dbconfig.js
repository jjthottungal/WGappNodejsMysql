
//Include enviroment variable package
require('dotenv').config();
//Package Declaration
const sql = require('mysql2');

//DB Connectstring configuration
const config = {
    connectionLimit: 10,
    host: process.env.DB_SERVER,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_DATABASE,
    namedPlaceholders: true,
    multipleStatements: true
}

//Create connection pool promise
const poolPromise = new sql.createPool(config).promise();

module.exports = {
    poolPromise: poolPromise,
    sql: sql
}



