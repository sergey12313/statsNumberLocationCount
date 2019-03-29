const mysql = require('mysql2/promise');
const config = require('./config').mysqlRtu;


async function getVatsNumbers(connection) {
    const [rows] = await connection.execute('SELECT interval_begin as start, interval_end as end FROM `NumberInterval`');
    const result = rows.map(({ start, end }) => {
        if (start === end) {
            return start
        }
    })
    return result;
}
async function getAllTerminals(connection) {
    const [rows] = await connection.execute('SELECT login as number, address as ip FROM `UserTerminal` where LENGTH(`login`) >= 5');
    return rows;
}

async function conectMysql() {
    const connection = await mysql.createConnection(config);
    return connection;
}


module.exports = async function getNumFromRtu() {
    const conection = await conectMysql()
    const allTerminals = await getAllTerminals(conection)
    const vatsNumbers = await getVatsNumbers(conection);
    await conection.end()
    return {
        allTerminals,
        vatsNumbers,
    }
}