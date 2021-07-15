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
var express = require('express');
var mysql = require('mysql');
var _a = require('../utils/applicationApiRequests'), getAllOffers = _a.getAllOffers, getSpecificOffers = _a.getSpecificOffers, getOfferTypes = _a.getOfferTypes, getOffer = _a.getOffer;
var _b = require('../utils/adminApiRequests'), deleteOffer = _b.deleteOffer, addOffer = _b.addOffer, editOffer = _b.editOffer;
var _c = require('../utils/loginSystem'), checkLoginData = _c.checkLoginData, generateLoginToken = _c.generateLoginToken, checkLoginToken = _c.checkLoginToken, logOut = _c.logOut;
var _d = require('http-status-codes'), OK = _d.OK, CREATED = _d.CREATED, NO_CONTENT = _d.NO_CONTENT, BAD_REQUEST = _d.BAD_REQUEST, NOT_FOUND = _d.NOT_FOUND;
// create router
var router = express.Router();
//@ts-ignore
router.get('/getAllOffers', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, getAllOffers()];
            case 1:
                response = _a.sent();
                res.status(OK).send(response);
                return [2 /*return*/];
        }
    });
}); });
//@ts-ignore
router.get('/getSpecificOffers/:typeID', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, getSpecificOffers(Number(req.params.typeID))];
            case 1:
                response = _a.sent();
                res.status(OK).send(response);
                return [2 /*return*/];
        }
    });
}); });
//@ts-ignore
router.get('/getOffer/:ID', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, getOffer(Number(req.params.ID))];
            case 1:
                response = _a.sent();
                if (response) {
                    res.status(OK).send(response[0]);
                }
                return [2 /*return*/];
        }
    });
}); });
//@ts-ignore
router.get('/getOfferTypes', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, getOfferTypes()];
            case 1:
                response = _a.sent();
                res.status(OK).send(response);
                return [2 /*return*/];
        }
    });
}); });
//@ts-ignore
router.post('/getLoginToken', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var email, password, adminId, tokenData;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                email = req.body.email;
                password = req.body.password;
                return [4 /*yield*/, checkLoginData(email, password)];
            case 1:
                adminId = _a.sent();
                if (!(adminId && adminId[0] && adminId[0].admin_id)) return [3 /*break*/, 3];
                return [4 /*yield*/, generateLoginToken(adminId[0].admin_id)];
            case 2:
                tokenData = _a.sent();
                res.status(OK).send(tokenData);
                return [3 /*break*/, 4];
            case 3:
                res.status(401).send("Login data not ok");
                _a.label = 4;
            case 4: return [2 /*return*/];
        }
    });
}); });
//@ts-ignore
router.delete('/logOut', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!checkLoginToken(req.body.admin_id, req.body.token)) return [3 /*break*/, 2];
                return [4 /*yield*/, logOut(req.body.admin_id)];
            case 1:
                _a.sent();
                res.status(OK).send("OK");
                return [3 /*break*/, 3];
            case 2:
                res.status(401).send("You are Unauthorized");
                _a.label = 3;
            case 3: return [2 /*return*/];
        }
    });
}); });
//@ts-ignore
router.delete('/deleteOffer', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!checkLoginToken(req.body.admin_id, req.body.token)) return [3 /*break*/, 2];
                return [4 /*yield*/, deleteOffer(req.body.applicationid)];
            case 1:
                _a.sent();
                res.status(OK).send("OK");
                return [3 /*break*/, 3];
            case 2:
                res.status(401).send("You are Unauthorized");
                _a.label = 3;
            case 3: return [2 /*return*/];
        }
    });
}); });
//@ts-ignore
router.post('/addOffer', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!checkLoginToken(req.body.admin_id, req.body.token)) return [3 /*break*/, 2];
                return [4 /*yield*/, addOffer(req.body.application)];
            case 1:
                _a.sent();
                res.status(OK).send("OK");
                return [3 /*break*/, 3];
            case 2:
                res.status(401).send("You are Unauthorized");
                _a.label = 3;
            case 3: return [2 /*return*/];
        }
    });
}); });
//@ts-ignore
router.put('/editOffer', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!checkLoginToken(req.body.admin_id, req.body.token)) return [3 /*break*/, 2];
                return [4 /*yield*/, editOffer(req.body.application)];
            case 1:
                _a.sent();
                res.status(OK).send("OK");
                return [3 /*break*/, 3];
            case 2:
                res.status(401).send("You are Unauthorized");
                _a.label = 3;
            case 3: return [2 /*return*/];
        }
    });
}); });
// export router
module.exports = router;
