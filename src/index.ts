#!/usr/bin/env node

import chalk from "chalk";
import yargs from "yargs";
import getCommand from "./commands";
import { CONFIG_NAME, createReactliConfig } from "./commands/init";

const COMMANDS_ALLOWED_WITHOUT_REACT_APP = ["new", "init"];

const main = async () => {
  const usage = `Usage: rc <option> `;
  const options = yargs
    .usage(usage)
    .option("new", { description: "Create New React app" })
    .option("init", { description: "Initialize Reactli for your Project" })
    .help(true);

  const args = await options.argv;
  const allArgs = {
    args: args._ as string[],
    named: { ...args } as Record<string, any>,
  };

  const command = getCommand(args._[0]);
  try {
    global.config = await createReactliConfig();
  } catch (error) {
    if (!COMMANDS_ALLOWED_WITHOUT_REACT_APP.includes(args._[0] as string)) {
      console.log(chalk.red("No", CONFIG_NAME, "detected."));
      console.log("Run `rc init` to generate", CONFIG_NAME);
      process.exit(1);
    }
  }

  if (command) {
    command(allArgs);
  } else {
    console.log("Command not found\n");
    yargs.showHelp();
    process.exit(1);
  }
};

main();
