const mysql = require('mysql2/promise');
// const config = require('./config').mysqlStat;


async function conectMysql(config) {
  const connection = await mysql.createConnection(config);
  return connection;
}


module.exports = config => async function writeStats(stats) {
  const sql = 'Insert into numberLocationCount set ?';
  const connection = await conectMysql(config);
  await connection.query(sql, stats);
  await connection.end();
};
