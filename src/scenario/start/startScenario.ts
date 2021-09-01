import TelegramBot, { Chat } from 'node-telegram-bot-api';

import { UserService } from '../../services/UserService';
import { waitMessage } from '../../utils/botUtils';
import { Scenario, ScenarioItem } from '../types';

function* startMessagesGenerator(
  userName: string
): Scenario<'preferredCar' | 'preferredWheelRadius'> {
  const payload: ScenarioItem<'preferredCar' | 'preferredWheelRadius'>[] = [
    {
      key: 'preferredCar',
      message: `Hello, ${userName}!\nPlease, choose your car name`,
    },
    {
      key: 'preferredCar',
      message: `Please, choose your car model`,
    },
    {
      key: 'preferredWheelRadius',
      message: `Finally, which wheel radius do you prefer`,
    },
  ];

  let currentIndex = 0;

  while (payload.length > currentIndex) {
    yield payload[currentIndex];
    currentIndex++;
  }

  return payload[currentIndex];
}

const getUserPreferences = async ({
  chat,
  bot,
  username,
}: {
  chat: Chat;
  bot: TelegramBot;
  username: string;
}) => {
  const scenario = startMessagesGenerator(username);

  const userPreferences = {
    preferredWheelRadius: 0,
    preferredCar: '',
  };

  async function processMessage(): Promise<{
    preferredCar: string;
    preferredWheelRadius: number;
  }> {
    const { value, done } = scenario.next();

    if (value) {
      const { key, message } = value;

      await bot.sendMessage(chat.id, message);

      try {
        const answer = await waitMessage(bot);

        if (key === 'preferredWheelRadius') {
          userPreferences[key] = parseInt(answer);
        } else if (key === 'preferredCar') {
          if (userPreferences.preferredCar) {
            userPreferences.preferredCar += ` ${answer}`;
          } else {
            userPreferences.preferredCar = answer;
          }
        }
      } catch (e) {
        console.error(e);
        throw Promise.reject(e);
      }
    }

    if (done) {
      return Promise.resolve(userPreferences);
    }

    const nextResponse = await processMessage();
    return nextResponse;
  }

  const result = await processMessage();
  return result;
};

export const startScenario = async ({
  bot,
  chat: { chat },
  userService,
}: {
  bot: TelegramBot;
  chat: TelegramBot.Message;
  userService: UserService;
}) => {
  const username = `${chat.first_name} ${chat.last_name}`;

  try {
    const userPreferences = await getUserPreferences({
      chat,
      bot,
      username,
    });

    const user = {
      name: username,
      chatId: chat.id,
      ...userPreferences,
    };

    const dbResponse = await userService.addUser(user);

    if (dbResponse) {
      bot.sendMessage(
        chat.id,
        `
              user: {
                id: ${dbResponse.id},
                name: ${dbResponse.name},
                chatId: ${dbResponse.chatId},
                preferredCar: ${dbResponse.preferredCar},
                preferredWheelRadius: ${dbResponse.preferredWheelRadius},
              }`
      );
    }
  } catch {
    bot.sendMessage(chat.id, 'Sorry, the task is timed out');
  }
};
