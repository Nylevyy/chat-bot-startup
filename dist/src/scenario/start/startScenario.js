"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
exports.startScenario = void 0;
var botUtils_1 = require("../../utils/botUtils");
function startMessagesGenerator(userName) {
    var payload, currentIndex;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                payload = [
                    {
                        key: 'preferredCar',
                        message: "Hello, " + userName + "!\nPlease, choose your car name",
                    },
                    {
                        key: 'preferredCar',
                        message: "Please, choose your car model",
                    },
                    {
                        key: 'preferredWheelRadius',
                        message: "Finally, which wheel radius do you prefer",
                    },
                ];
                currentIndex = 0;
                _a.label = 1;
            case 1:
                if (!(payload.length > currentIndex)) return [3 /*break*/, 3];
                return [4 /*yield*/, payload[currentIndex]];
            case 2:
                _a.sent();
                currentIndex++;
                return [3 /*break*/, 1];
            case 3: return [2 /*return*/, payload[currentIndex]];
        }
    });
}
var getUserPreferences = function (_a) {
    var chat = _a.chat, bot = _a.bot, username = _a.username;
    return __awaiter(void 0, void 0, void 0, function () {
        function processMessage() {
            return __awaiter(this, void 0, void 0, function () {
                var _a, value, done, key, message, answer, e_1, nextResponse;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _a = scenario.next(), value = _a.value, done = _a.done;
                            if (!value) return [3 /*break*/, 5];
                            key = value.key, message = value.message;
                            return [4 /*yield*/, bot.sendMessage(chat.id, message)];
                        case 1:
                            _b.sent();
                            _b.label = 2;
                        case 2:
                            _b.trys.push([2, 4, , 5]);
                            return [4 /*yield*/, botUtils_1.waitMessage(bot)];
                        case 3:
                            answer = _b.sent();
                            if (key === 'preferredWheelRadius') {
                                userPreferences[key] = parseInt(answer);
                            }
                            else if (key === 'preferredCar') {
                                if (userPreferences.preferredCar) {
                                    userPreferences.preferredCar += " " + answer;
                                }
                                else {
                                    userPreferences.preferredCar = answer;
                                }
                            }
                            return [3 /*break*/, 5];
                        case 4:
                            e_1 = _b.sent();
                            console.error(e_1);
                            throw Promise.reject(e_1);
                        case 5:
                            if (done) {
                                return [2 /*return*/, Promise.resolve(userPreferences)];
                            }
                            return [4 /*yield*/, processMessage()];
                        case 6:
                            nextResponse = _b.sent();
                            return [2 /*return*/, nextResponse];
                    }
                });
            });
        }
        var scenario, userPreferences, result;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    scenario = startMessagesGenerator(username);
                    userPreferences = {
                        preferredWheelRadius: 0,
                        preferredCar: '',
                    };
                    return [4 /*yield*/, processMessage()];
                case 1:
                    result = _b.sent();
                    return [2 /*return*/, result];
            }
        });
    });
};
var startScenario = function (_a) {
    var bot = _a.bot, chat = _a.chat.chat, userService = _a.userService;
    return __awaiter(void 0, void 0, void 0, function () {
        var username, userPreferences, user, dbResponse, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    username = chat.first_name + " " + chat.last_name;
                    _c.label = 1;
                case 1:
                    _c.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, getUserPreferences({
                            chat: chat,
                            bot: bot,
                            username: username,
                        })];
                case 2:
                    userPreferences = _c.sent();
                    user = __assign({ name: username, chatId: chat.id }, userPreferences);
                    return [4 /*yield*/, userService.addUser(user)];
                case 3:
                    dbResponse = _c.sent();
                    if (dbResponse) {
                        bot.sendMessage(chat.id, "\n              user: {\n                id: " + dbResponse.id + ",\n                name: " + dbResponse.name + ",\n                chatId: " + dbResponse.chatId + ",\n                preferredCar: " + dbResponse.preferredCar + ",\n                preferredWheelRadius: " + dbResponse.preferredWheelRadius + ",\n              }");
                    }
                    return [3 /*break*/, 5];
                case 4:
                    _b = _c.sent();
                    bot.sendMessage(chat.id, 'Sorry, the task is timed out');
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    });
};
exports.startScenario = startScenario;
