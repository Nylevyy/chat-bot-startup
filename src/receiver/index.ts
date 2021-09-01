import TelegramBot, { Chat } from 'node-telegram-bot-api';
import { startGenerator } from '../messages/generators';
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
    this.bot.on('message', async ({ text, chat }) => {
      if (text === Commands.START) {
        const userName = `${chat.first_name} ${chat.last_name}`;
        const generator = startGenerator(userName);

        const { preferredCar, preferredWheelRadius } = await startFn(
          generator,
          {
            chat,
            bot: this.bot,
          }
        );

        const user = {
          name: userName,
          chatId: chat.id,
          preferredCar,
          preferredWheelRadius,
        };

        const response = await this.userService.addUser(user);

        if (response) {
          this.bot.sendMessage(
            chat.id,
            `
            user: {
              id: ${response.id},
              name: ${response.name},
              chatId: ${response.chatId},
              preferredCar: ${response.preferredCar},
              preferredWheelRadius: ${response.preferredWheelRadius},
            }`
          );
        }
      }
    });
  }
}

const startFn = async (
  generator: Generator,
  { chat, bot }: { chat: Chat; bot: TelegramBot }
) => {
  let preferredCar = '';
  let preferredWheelRadius = 0;

  async function processMessage(): Promise<{
    preferredCar: string;
    preferredWheelRadius: number;
  }> {
    const { value: message, done } = generator.next();

    if (message) {
      await bot.sendMessage(chat.id, message);
      const answer = await waitMessage(bot);
      preferredCar += answer;
    }

    if (done) {
      return Promise.resolve({
        preferredCar,
        preferredWheelRadius,
      });
    }

    const nextResponse = await processMessage();
    return nextResponse;
  }

  const result = await processMessage();
  return result;
};

function waitMessage(bot: TelegramBot) {
  return new Promise((res) => {
    bot.once('message', ({ text }) => {
      res(text);
    });
  });
}
