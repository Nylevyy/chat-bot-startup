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
exports.MessageReceiver = void 0;
var generators_1 = require("../messages/generators");
var UserService_1 = require("../services/UserService");
var types_1 = require("./types");
var MessageReceiver = /** @class */ (function () {
    function MessageReceiver(bot) {
        this.bot = bot;
        this.userService = new UserService_1.UserService();
    }
    MessageReceiver.prototype.init = function () {
        var _this = this;
        this.bot.on('message', function (_a) {
            var text = _a.text, chat = _a.chat;
            return __awaiter(_this, void 0, void 0, function () {
                var userName, generator, _b, preferredCar, preferredWheelRadius, user, response;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            if (!(text === types_1.Commands.START)) return [3 /*break*/, 3];
                            userName = chat.first_name + " " + chat.last_name;
                            generator = generators_1.startGenerator(userName);
                            return [4 /*yield*/, startFn(generator, {
                                    chat: chat,
                                    bot: this.bot,
                                })];
                        case 1:
                            _b = _c.sent(), preferredCar = _b.preferredCar, preferredWheelRadius = _b.preferredWheelRadius;
                            user = {
                                name: userName,
                                chatId: chat.id,
                                preferredCar: preferredCar,
                                preferredWheelRadius: preferredWheelRadius,
                            };
                            return [4 /*yield*/, this.userService.addUser(user)];
                        case 2:
                            response = _c.sent();
                            if (response) {
                                this.bot.sendMessage(chat.id, "\n            user: {\n              id: " + response.id + ",\n              name: " + response.name + ",\n              chatId: " + response.chatId + ",\n              preferredCar: " + response.preferredCar + ",\n              preferredWheelRadius: " + response.preferredWheelRadius + ",\n            }");
                            }
                            _c.label = 3;
                        case 3: return [2 /*return*/];
                    }
                });
            });
        });
    };
    return MessageReceiver;
}());
exports.MessageReceiver = MessageReceiver;
var startFn = function (generator, _a) {
    var chat = _a.chat, bot = _a.bot;
    return __awaiter(void 0, void 0, void 0, function () {
        function processMessage() {
            return __awaiter(this, void 0, void 0, function () {
                var _a, message, done, answer, nextResponse;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _a = generator.next(), message = _a.value, done = _a.done;
                            if (!message) return [3 /*break*/, 3];
                            return [4 /*yield*/, bot.sendMessage(chat.id, message)];
                        case 1:
                            _b.sent();
                            return [4 /*yield*/, waitMessage(bot)];
                        case 2:
                            answer = _b.sent();
                            preferredCar += answer;
                            _b.label = 3;
                        case 3:
                            if (done) {
                                return [2 /*return*/, Promise.resolve({
                                        preferredCar: preferredCar,
                                        preferredWheelRadius: preferredWheelRadius,
                                    })];
                            }
                            return [4 /*yield*/, processMessage()];
                        case 4:
                            nextResponse = _b.sent();
                            return [2 /*return*/, nextResponse];
                    }
                });
            });
        }
        var preferredCar, preferredWheelRadius, result;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    preferredCar = '';
                    preferredWheelRadius = 0;
                    return [4 /*yield*/, processMessage()];
                case 1:
                    result = _b.sent();
                    return [2 /*return*/, result];
            }
        });
    });
};
function waitMessage(bot) {
    return new Promise(function (res) {
        bot.once('message', function (_a) {
            var text = _a.text;
            res(text);
        });
    });
}
