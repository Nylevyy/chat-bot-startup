import TelegramBot from 'node-telegram-bot-api';

class MessageGenerator implements MessageGenerator {
  private readonly bot: TelegramBot;

  constructor(bot: TelegramBot) {
    this.bot = bot;
  }

  sendMessage(chatId: string, message: string) {
    this.bot.sendMessage(chatId, message);
  }
}

export { MessageGenerator };
