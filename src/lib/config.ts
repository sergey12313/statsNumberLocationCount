import {config as dotenvConfig} from "dotenv";
import { PoolOptions } from "mysql2/promise";
import { ConnectionOptions } from "sybase-promised";

dotenvConfig();

function getOptionsObject(prefix: string): {[key: string]: string} {
    return Object.entries(process.env)
    .filter(([name]) => {
        return name.match(prefix);
      })
      .map(([name, value= ""]) => {
        const regExp = new RegExp(`(${prefix})(.*)`)
        const paramName = name.replace(regExp, (str, p1, p2) => {
          return p2.toLowerCase();
        });
        return [paramName, value];
      })
      .reduce((acc: {[key: string]: string}, [name, value]) => {
        acc[name] = value;
        return acc;
      }, {});
}

const sybaseOpt = getOptionsObject("SYBASE_");

export const sybaseOptions: ConnectionOptions = {
    dbname: sybaseOpt.database,
    host: sybaseOpt.host,
    password: sybaseOpt.password,
    port: Number(sybaseOpt.port),
    username: sybaseOpt.user,
};

export const mysqlRtuOptions: PoolOptions = getOptionsObject("MYSQLRTU_");

export const mysqlStatOptions: PoolOptions = getOptionsObject("MYSQLSTATS_");
