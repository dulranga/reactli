import newApp from "./new-app";

export type Command = (args: (string | number)[]) => void;

type Commands = Record<string, Command>;

const commands: Commands = {
  new: newApp,
};

const getCommand = (cmd: string | number) => {
  return commands[cmd] ?? null;
};

export default getCommand;
