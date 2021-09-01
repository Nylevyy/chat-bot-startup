import TelegramBot from 'node-telegram-bot-api';

import { startScenario } from '../scenario/start';
import { UserService } from '../services/UserService';
import { Commands } from './types';

export class MessageReceiver {
  private readonly bot: TelegramBot;

  private userService: UserService;

  constructor(bot: TelegramBot) {
    this.bot = bot;
    this.userService = new UserService();
  }

  init() {
    this.userService.init();

    this.bot.on('message', async (chat) => {
      switch (chat.text) {
        case Commands.START:
          await startScenario({
            chat,
            bot: this.bot,
            userService: this.userService,
          });
          break;
        case Commands.REFRESH:
          await this.userService.refresh();
          this.bot.sendMessage(chat.chat.id, 'Database was dropped');
          break;
        default:
          this.bot.sendMessage(
            chat.chat.id,
            'Invalid command, try /start or /refresh'
          );
          break;
      }
    });
  }
}
