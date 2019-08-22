import {allTerminalsResult, IStatsNumbersLocation} from "./interfaces";

export default function getStatNumbersLocation(terminals: allTerminalsResult) {
  const stats: IStatsNumbersLocation = {
    ats2: 0,
    ats7: 0,
    ats9: 0,
    nishegorodskay5: 0,
    numbersOnVoipGw: 0,
    pionerskay2: 0,
    shochina5: 0,
    zel22: 0,
  };
  terminals.forEach((element) => {
    const { ip } = element;
    const num = Number(element.number);
    if (ip === null) {
      stats.numbersOnVoipGw += 1;
    } else if (ip === "192.168.15.1") {
      if (num >= 91953 && num <= 92313) {
        stats.nishegorodskay5 += 1;
      } else if (num >= 92514 && num <= 93001) {
        stats.pionerskay2 += 1;
      } else {
        stats.ats9 += 1;
      }
    } else if (element.ip === "192.168.15.3") {
      if (num >= 78112 && num <= 78415) {
        stats.zel22 += 1;
      } else if (num >= 79768 && num <= 79999) {
        stats.shochina5 += 1;
      } else {
        stats.ats7 += 1;
      }
    } else if (ip === "192.168.15.4") {
      stats.ats2 += 1;
    } else {
      stats.numbersOnVoipGw += 1;
    }
  });
  return stats;
}
