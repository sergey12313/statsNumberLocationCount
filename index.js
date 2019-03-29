const { sybase, mysqlRtu, mysqlStat } = require('./config');

const getNumFromBilling = require('./lib/get-num-from-billing')(sybase);
const getNumFromRtu = require('./lib/get-num-from-rtu')(mysqlRtu);
const writeStats = require('./lib/write-stats')(mysqlStat);
const getStatNumbersLocation = require('./lib/get-stat-numbers-location');

async function main() {
  const resultFromBillSet = await getNumFromBilling();
  const { allTerminals, vatsNumbers } = await getNumFromRtu();
  const vatsNumbersIncludeContract = vatsNumbers.filter(elem => resultFromBillSet.has(elem));
  const allTerminalsIncludeContract = allTerminals
    .filter(elem => resultFromBillSet.has(elem.number));
  const statsNumbersLocation = getStatNumbersLocation(allTerminalsIncludeContract);

  const statsNumbers = {
    allVatsNumbers: vatsNumbers.length,
    allNumbersOnRtu: vatsNumbers.length + allTerminals.length,
    vatsNumbersIncludeContract: vatsNumbersIncludeContract.length,
    numbersIncludeContract: vatsNumbersIncludeContract.length + allTerminalsIncludeContract.length,
  };

  await writeStats(Object.assign(statsNumbers, statsNumbersLocation));
}


main();
