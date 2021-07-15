"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var app = express_1.default();
var port = 4000;
var applicationRouter = require('./routes/application');
app.use(cors_1.default());
app.use(express_1.default.json());
app.use('/api/application', applicationRouter);
app.get('/', function (req, res) {
    res.status(200).send('Hello World!');
});
app.listen(port, function () {
    console.log("Server Started at Port " + port);
});
