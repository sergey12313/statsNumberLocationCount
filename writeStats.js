const mysql = require('mysql2/promise');
const config = require('./config').mysqlStat;


async function conectMysql() {
    const connection = await mysql.createConnection(config);
    return connection;
}


module.exports = async function writeStats(stats) {
    let sql = 'Insert into numberLocationCount set ?'
    const connection = await conectMysql()
    await connection.query(sql, stats);
    await connection.end()
}