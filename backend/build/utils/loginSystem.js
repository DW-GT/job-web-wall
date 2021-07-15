"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var mysql = require('mysql');
require('dotenv').config();
var nanoid_1 = require("nanoid");
var loginTokens = [];
var connection = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
});
connection.connect();
//@ts-ignore
function initialize() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, new Promise(function (resolve, reject) {
                    connection.query('SELECT admin_id, token, expire_date FROM `login_tokens`', [], 
                    //@ts-ignore
                    function (error, results, fields) {
                        console.log(results);
                        //@ts-ignore
                        results.forEach(function (loginTokenObject) {
                            loginTokens.push({
                                admin_id: loginTokenObject.admin_id,
                                login_token: loginTokenObject.token,
                                expire_date: loginTokenObject.expire_date
                            });
                        });
                        resolve(results);
                    });
                })];
        });
    });
}
;
var TWO_DAYS_IN_MILLISCONDS = 172800000;
setInterval(function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, deleteOldTokens()];
            case 1:
                _a.sent();
                loginTokens.filter(function (loginTokenObject) { return new Date(loginTokenObject.expire_date) >= new Date(); });
                return [2 /*return*/];
        }
    });
}); }, TWO_DAYS_IN_MILLISCONDS);
//@ts-ignore
function deleteOldTokens() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, new Promise(function (resolve, reject) {
                    connection.query('DELETE FROM `login_tokens` WHERE expire_date<?', [new Date().toJSON().slice(0, 10)], 
                    //@ts-ignore
                    function (error, results, fields) {
                        resolve("Ok");
                    });
                })];
        });
    });
}
;
(function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, deleteOldTokens()];
            case 1:
                _a.sent();
                return [4 /*yield*/, initialize()];
            case 2:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); })();
function checkLoginToken(id, loginToken) {
    return !!loginTokens.find(function (loginData) { return loginData.admin_id == id && loginData.login_token == loginToken && new Date(loginData.expire_date) >= new Date(); });
}
function checkLoginData(email, password) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, new Promise(function (resolve, reject) {
                    connection.query('SELECT admin_id FROM `admins` WHERE email=? AND password=?', [email, password], 
                    //@ts-ignore
                    function (error, results, fields) {
                        resolve(results);
                    });
                })];
        });
    });
}
function generateLoginToken(id) {
    return __awaiter(this, void 0, void 0, function () {
        var today, tomorrow, token, loginTokenData;
        return __generator(this, function (_a) {
            today = new Date();
            tomorrow = new Date(today);
            tomorrow.setDate(tomorrow.getDate() + 1);
            token = nanoid_1.nanoid();
            loginTokenData = {
                admin_id: id,
                login_token: token,
                expire_date: tomorrow.toJSON().slice(0, 10)
            };
            loginTokens.push(loginTokenData);
            return [2 /*return*/, new Promise(function (resolve, reject) {
                    connection.query('INSERT INTO `login_tokens` (admin_id,token,expire_date) VALUES (?,?,?)', [loginTokenData.admin_id, loginTokenData.login_token, loginTokenData.expire_date], 
                    //@ts-ignore
                    function (error, results, fields) { resolve(loginTokenData); });
                })];
        });
    });
}
function logOut(id) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            loginTokens.filter(function (loginTokenData) { return loginTokenData.admin_id == id; });
            return [2 /*return*/, new Promise(function (resolve, reject) {
                    connection.query('DELETE FROM `login_tokens` WHERE admin_id=?', [id], 
                    //@ts-ignore
                    function (error, results, fields) {
                        resolve("Ok");
                    });
                })];
        });
    });
}
module.exports.checkLoginToken = checkLoginToken;
module.exports.checkLoginData = checkLoginData;
module.exports.logOut = logOut;
module.exports.generateLoginToken = generateLoginToken;
