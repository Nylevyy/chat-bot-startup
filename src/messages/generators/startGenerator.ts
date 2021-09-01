import { getStartMessages } from '../templates';

export function* startGenerator(userName: string) {
  const messages = getStartMessages(userName);

  let messageIndex = 0;

  while (messages.length > messageIndex) {
    yield messages[messageIndex];
    messageIndex++;
  }

  return messages[messageIndex];
}
