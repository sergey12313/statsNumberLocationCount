import * as mysql from "mysql2/promise";
import {allTerminalsResult, IRtuResult, vatsNumbersResult } from "./interfaces";
import mysqlCreatePool from "./mysql-helper";

async function getVatsNumbers(connection: mysql.PoolConnection): Promise<vatsNumbersResult> {
  const [rows] = await connection.execute<mysql.RowDataPacket[]>(
    "SELECT interval_begin as start, interval_end as end FROM `NumberInterval`",
  );
  connection.release();
  const result = rows.map(({ start }) => start as string);
  return result;
}

async function getAllTerminals(connection: mysql.PoolConnection) {
  const [rows]  = await connection.execute<mysql.RowDataPacket[]>(
    "SELECT login as number, address as ip FROM `UserTerminal` where LENGTH(`login`) >= 5",
  );
  connection.release();

  return rows as allTerminalsResult;
}

export default (options: mysql.PoolOptions) =>
  async function getNumFromRtu(): Promise<IRtuResult> {
    const mysqlHelper = await mysqlCreatePool(options);
    const [allTerminals, vatsNumbers] = await Promise.all([
      await getAllTerminals(await mysqlHelper.getConnection()),
      await getVatsNumbers(await mysqlHelper.getConnection()),
    ]);
    await mysqlHelper.end();
    return {
      allTerminals,
      vatsNumbers,
    };
  };
