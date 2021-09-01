export const getStartMessages = (userName: string) => {
  const messages = [
    `Hello, ${userName}!\nPlease, choose your car name`,
    `Please, choose your car model`,
    `Finally, which wheel radius do you prefer`,
  ];

  return messages;
};
