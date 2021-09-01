"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.waitMessage = void 0;
function waitMessage(bot) {
    return new Promise(function (res, rej) {
        var timeout = setTimeout(function () {
            rej('response timed out');
        }, 15000);
        bot.once('message', function (_a) {
            var text = _a.text;
            clearTimeout(timeout);
            res(text || '');
        });
    });
}
exports.waitMessage = waitMessage;
