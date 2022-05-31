import chalk from "chalk";
import { getTemplate } from "../../templates";
import { Command } from "../../utils/types";

export const genComponent: Command = async ({ args }) => {
  const [name] = args;
  if (!name) return showHelp("No Component Name provided");

  const template = await getTemplate("components/default.template");
  console.log(template);
};

const showHelp = (errorMsg: string) => {
  console.log(chalk.red(errorMsg));
  console.log("Try:\n", chalk.green("  rc g c <file_name>"));
};
