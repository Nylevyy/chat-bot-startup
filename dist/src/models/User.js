"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserModel = void 0;
var sequelize_1 = require("sequelize");
var UserModel = /** @class */ (function (_super) {
    __extends(UserModel, _super);
    function UserModel() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return UserModel;
}(sequelize_1.Model));
var getUserModel = function (sequelize) {
    return sequelize.define('users', {
        id: {
            type: sequelize_1.DataTypes.UUID,
            unique: true,
            primaryKey: true,
            defaultValue: sequelize_1.DataTypes.UUIDV4,
        },
        chatId: {
            type: sequelize_1.DataTypes.INTEGER,
            unique: true,
        },
        name: { type: sequelize_1.DataTypes.STRING },
        preferredCar: { type: sequelize_1.DataTypes.STRING },
        preferredWheelRadius: { type: sequelize_1.DataTypes.INTEGER },
    });
};
exports.getUserModel = getUserModel;
