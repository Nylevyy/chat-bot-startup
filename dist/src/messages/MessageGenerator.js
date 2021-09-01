"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageGenerator = void 0;
var MessageGenerator = /** @class */ (function () {
    function MessageGenerator(bot) {
        this.bot = bot;
    }
    MessageGenerator.prototype.sendMessage = function (chatId, message) {
        this.bot.sendMessage(chatId, message);
    };
    return MessageGenerator;
}());
exports.MessageGenerator = MessageGenerator;
