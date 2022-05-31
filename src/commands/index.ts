import { Nullable } from "../utils/types";
import newApp from "./new-app";
import { Command, Commands } from "./types";

const commands: Commands = {
  new: newApp,
};

const getCommand = (cmd: string | number): Nullable<Command> => {
  return commands[cmd] ?? null;
};

export default getCommand;
