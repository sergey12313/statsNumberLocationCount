module.exports = function getStatNumbersLocation(terminals) {
  const stats = {
    numbersOnVoipGw: 0,
    zel22: 0,
    shochina5: 0,
    nishegorodskay5: 0,
    pionerskay2: 0,
    ats9: 0,
    ats7: 0,
    ats2: 0,
  };
  terminals.forEach((element) => {
    const { ip } = element;
    const number = Number(element.number);
    if (ip === null) {
      stats.numbersOnVoipGw += 1;
    } else if (element.ip === '192.168.15.1') {
      if (number >= 91953 && number <= 92313) {
        stats.nishegorodskay5 += 1;
      } else if (number >= 92514 && number <= 93001) {
        stats.pionerskay2 += 1;
      } else {
        stats.ats9 += 1;
      }
    } else if (element.ip === '192.168.15.3') {
      if (number >= 78112 && number <= 78415) {
        stats.zel22 += 1;
      } else if (number >= 79768 && number <= 79999) {
        stats.shochina5 += 1;
      } else {
        stats.ats7 += 1;
      }
    } else if (element.ip === '192.168.15.4') {
      stats.ats2 += 1;
    } else {
      stats.numbersOnVoipGw += 1;
    }
  });
  return stats;
};
