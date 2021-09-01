import TelegramBotApi from 'node-telegram-bot-api';
import { API_KEY } from './consts';
import { MessageReceiver } from './receiver';

const bot = new TelegramBotApi(API_KEY, {
  polling: true,
});

// bot.on('message', ({ chat, text, author_signature }) => {
//   bot.sendMessage(chat.id, `you are ${author_signature} or ${chat.first_name}, sent me "${text}"`);
// });

// bot.on('message', () => {

// })

new MessageReceiver(bot).init();
