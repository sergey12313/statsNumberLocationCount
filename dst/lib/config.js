"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv_1 = require("dotenv");
dotenv_1.config();
function getOptionsObject(prefix) {
    return Object.entries(process.env)
        .filter(function (_a) {
        var name = _a[0];
        return name.match(prefix);
    })
        .map(function (_a) {
        var name = _a[0], _b = _a[1], value = _b === void 0 ? "" : _b;
        var regExp = new RegExp("(" + prefix + ")(.*)");
        var paramName = name.replace(regExp, function (str, p1, p2) {
            return p2.toLowerCase();
        });
        return [paramName, value];
    })
        .reduce(function (acc, _a) {
        var name = _a[0], value = _a[1];
        acc[name] = value;
        return acc;
    }, {});
}
var sybaseOpt = getOptionsObject("SYBASE_");
exports.sybaseOptions = {
    dbname: sybaseOpt.database,
    host: sybaseOpt.host,
    password: sybaseOpt.password,
    port: Number(sybaseOpt.port),
    username: sybaseOpt.user,
};
exports.mysqlRtuOptions = getOptionsObject("MYSQLRTU_");
exports.mysqlStatOptions = getOptionsObject("MYSQLSTATS_");
