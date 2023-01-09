const mysql = require('mysql2/promise');

const connection = async () =>
    mysql.createConnection({
        host: process.env.HOST,
        port: 3306,
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
        database: 'coffee_bill'
    });

module.exports = {
    connection
}