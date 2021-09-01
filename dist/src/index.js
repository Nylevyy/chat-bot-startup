"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var node_telegram_bot_api_1 = __importDefault(require("node-telegram-bot-api"));
var consts_1 = require("./consts");
var receiver_1 = require("./receiver");
var bot = new node_telegram_bot_api_1.default(consts_1.API_KEY, {
    polling: true,
});
// bot.on('message', ({ chat, text, author_signature }) => {
//   bot.sendMessage(chat.id, `you are ${author_signature} or ${chat.first_name}, sent me "${text}"`);
// });
// bot.on('message', () => {
// })
new receiver_1.MessageReceiver(bot).init();
