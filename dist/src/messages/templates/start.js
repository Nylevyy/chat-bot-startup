"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getStartMessages = void 0;
var getStartMessages = function (userName) {
    var messages = [
        "Hello, " + userName + "!\nPlease, choose your car name",
        "Please, choose your car model",
        "Finally, which wheel radius do you prefer",
    ];
    return messages;
};
exports.getStartMessages = getStartMessages;
