import { mysqlRtuOptions, mysqlStatOptions, sybaseOptions } from "./lib/config";
import getNumFromBilling from "./lib/get-num-from-billing";
import getNumFromRtu from "./lib/get-num-from-rtu";
import getStatNumbersLocation from "./lib/get-stat-numbers-location";
import {allTerminalsResult, IStatsNumbers, IStatsNumbersLocation} from "./lib/interfaces";
import writeStats from "./lib/write-stats";

async function main() {
  const resultFromBillSet = await getNumFromBilling(sybaseOptions)();
  const { allTerminals, vatsNumbers } = await getNumFromRtu(mysqlRtuOptions)();
  const vatsNumbersIncludeContract = vatsNumbers.filter((elem) => resultFromBillSet.has(elem));
  const allTerminalsIncludeContract: allTerminalsResult  = allTerminals
    .filter((elem) => resultFromBillSet.has(elem.number));
  const statsNumbersLocation: IStatsNumbersLocation = getStatNumbersLocation(allTerminalsIncludeContract);
  const statsNumbers: IStatsNumbers = {
    allNumbersOnRtu: vatsNumbers.length + allTerminals.length,
    allVatsNumbers: vatsNumbers.length,
    numbersIncludeContract: vatsNumbersIncludeContract.length + allTerminalsIncludeContract.length,
    vatsNumbersIncludeContract: vatsNumbersIncludeContract.length,
  };

  await writeStats(mysqlStatOptions)(Object.assign(statsNumbers, statsNumbersLocation));
}

main().catch((e) => global.console.error(e));

