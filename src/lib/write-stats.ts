import * as mysql from "mysql2/promise";
import { IAllStats } from "./interfaces";
import mysqlCreatePool from "./mysql-helper";

export default (options: mysql.PoolOptions)  => async function writeStats(stats: IAllStats) {
  const sql = "Insert into numberLocationCount1 set ?";
  const mysqlHelper = await mysqlCreatePool(options);
  const connection = await mysqlHelper.getConnection();
  await connection.query(sql, { ...stats, ...{ time: Math.floor(Date.now() / 1000) } });
  await mysqlHelper.end();
};
