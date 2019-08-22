import * as mysql from "mysql2/promise";

export default (options: mysql.PoolOptions) => {
    const pool: mysql.Pool = mysql.createPool(options);
    return {
      async getConnection() {
        return  await pool.getConnection();
      },
      end() {
        return pool.end();
      },
    };
};
