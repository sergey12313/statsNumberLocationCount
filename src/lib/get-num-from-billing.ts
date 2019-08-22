import Sybase from "sybase-promised";
import {sybaseResult} from "./interfaces";

const query = "Select  substring(STR_REPLACE(DEVICE, '-', NULL), 3, 5) As number "
  + "From INTEGRAL.dbo.PHONES Where CLIENT_CODE Is Not NULL and DEVICE like '45%'";

async function conectSybase(options: Sybase.ConnectionOptions) {
  const connection = new Sybase(options);
  await connection.connect();
  return connection;
}

export default (options: Sybase.ConnectionOptions) => async function getNumFromBilling(): Promise<sybaseResult> {
  const conectionSybase = await conectSybase(options);
  const result: Array<{number: string}>  = await conectionSybase.query(query);
  await conectionSybase.disconnect();
  return new Set(result.map(( obj ) => obj.number));
};
