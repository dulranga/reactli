import { Nullable } from "../utils/types";
import { generate } from "./generate";
import newApp from "./new-app";
import { Command, Commands } from "../utils/types";
import { init } from "./init";

const commands: Commands = {
  new: newApp,
  g: generate,
  generate: generate,
  init,
};

export const getCommand = (
  commands: Commands,
  cmd: string | number
): Nullable<Command> => {
  return commands[cmd] ?? null;
};

export default (cmd: string | number) => getCommand(commands, cmd);
