"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
var sequelize_1 = require("sequelize");
var getDbInstance = function () { return new sequelize_1.Sequelize({ dialect: 'postgres' }); };
exports.db = getDbInstance();
