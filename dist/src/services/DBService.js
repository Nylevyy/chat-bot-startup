"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
var sequelize_1 = require("sequelize");
var consts_1 = require("../consts");
var getDbInstance = function () {
    return new sequelize_1.Sequelize({
        dialect: 'postgres',
        database: 'test_db',
        host: '109.71.13.85',
        port: 6432,
        username: consts_1.USERNAME,
        password: consts_1.PASSWORD,
    });
};
exports.db = getDbInstance();
