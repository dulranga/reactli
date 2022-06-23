import chalk from "chalk";
import { getCommand } from "..";
import { Command, Commands } from "../../utils/types";
import { genComponent } from "./component";
import { genHook } from "./hook";

const options: Commands = {
  c: genComponent,
  component: genComponent,
  h: genHook,
  hook: genHook,
};

export const generate: Command = (props) => {
  const [_cmd, option, name] = props.args;
  if (!option) return showHelp("No option selected");

  const command = getCommand(options, option);
  if (command === null) return showHelp("Invalid Option");

  command({
    args: [name],
    named: props.named,
  });
};

const showHelp = (errorMsg: string) => {
  console.log(chalk.red(errorMsg));
  console.log("Try:\n", chalk.green("  rc g <option> <file_name>"));
  console.log(
    "Available Options:",
    chalk.green(Object.keys(options).join(", "))
  );
};
