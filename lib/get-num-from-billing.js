const Sybase = require('sybase-promised');
// const config = require('./config').sybase;


const query = "Select  substring(STR_REPLACE(DEVICE, '-', NULL), 3, 5) As number From INTEGRAL.dbo.PHONES Where CLIENT_CODE Is Not NULL and DEVICE like '45%'";
async function conectSybase(config) {
  const connection = new Sybase(config);
  await connection.connect();
  return connection;
}


module.exports = config => async function getNumFromBilling() {
  const conectionSybase = await conectSybase(config);
  const result = await conectionSybase.query(query);
  await conectionSybase.disconnect();
  return new Set(result.map(elem => elem.number));
};
