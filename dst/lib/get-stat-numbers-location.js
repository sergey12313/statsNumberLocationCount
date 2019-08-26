"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var IP = {
    "10.120.1.250": "zel22_eltex",
    "10.120.1.251": "zel22_eltex",
    "10.120.1.252": "zel22_eltex",
    "10.120.1.253": "zel22_eltex",
    "10.120.14.250": "park9",
    "10.120.14.251": "park9",
    "10.120.17.230": "zel10",
    "10.120.17.231": "zel10",
    "10.120.17.232": "zel10",
    "10.120.17.233": "zel10",
    "10.120.17.234": "zel10",
    "10.120.17.235": "zel10",
    "10.120.28.230": "volgostrtoy",
    "10.120.4.230": "mr2_31",
    "10.120.4.232": "mr2_31",
    "10.120.4.233": "mr2_31",
    "10.120.4.234": "mr2_31",
    "10.120.4.235": "mr2_31",
    "10.120.4.236": "mr2_31",
    "10.120.5.230": "mr2_19",
    "10.120.5.231": "mr2_19",
    "10.120.5.232": "mr2_19",
    "10.120.5.233": "mr2_19",
    "10.120.5.234": "mr2_19",
    "10.120.5.235": "mr2_21",
    "10.120.5.236": "mr2_21",
    "10.120.5.237": "mr2_21",
    "10.120.5.238": "mr2_21",
    "10.120.5.239": "mr2_21",
    "10.120.5.240": "mr2_21",
    "192.168.15.4": "ats2",
};
function getStatNumbersLocation(terminals) {
    var stats = {
        ats2: 0,
        ats7: 0,
        ats9: 0,
        mr2_19: 0,
        mr2_21: 0,
        mr2_31: 0,
        nishegorodskay5: 0,
        numbersOnVoipGw: 0,
        park9: 0,
        pionerskay2: 0,
        shochina5: 0,
        volgostrtoy: 0,
        zel10: 0,
        zel22: 0,
        zel22_eltex: 0,
    };
    terminals.forEach(function (element) {
        var ip = element.ip;
        var num = Number(element.number);
        if (ip === null) {
            stats.numbersOnVoipGw += 1;
        }
        else if (ip === "192.168.15.1") {
            if (num >= 91953 && num <= 92313) {
                stats.nishegorodskay5 += 1;
            }
            else if (num >= 92514 && num <= 93001) {
                stats.pionerskay2 += 1;
            }
            else {
                stats.ats9 += 1;
            }
        }
        else if (element.ip === "192.168.15.3") {
            if (num >= 78112 && num <= 78415) {
                stats.zel22 += 1;
            }
            else if (num >= 79768 && num <= 79999) {
                stats.shochina5 += 1;
            }
            else {
                stats.ats7 += 1;
            }
        }
        else if (Object.keys(IP).includes(ip)) {
            stats[IP[ip]] += 1;
        }
        else {
            stats.numbersOnVoipGw += 1;
        }
    });
    return stats;
}
exports.default = getStatNumbersLocation;
