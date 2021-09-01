import TelegramBot from 'node-telegram-bot-api';

export function waitMessage(bot: TelegramBot): Promise<string> {
  return new Promise((res, rej) => {
    const timeout = setTimeout(() => {
      rej('response timed out');
    }, 15000);

    bot.once('message', ({ text }) => {
      clearTimeout(timeout);
      res(text || '');
    });
  });
}
