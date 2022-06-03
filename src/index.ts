#!/usr/bin/env node

import yargs from "yargs";
import getCommand from "./commands";
import { isReactAvailable } from "./utils/check-react";

const COMMANDS_ALLOWED_WITHOUT_REACT_APP = ["new", "init"];

const init = async () => {
  const usage = `Usage: rc <option> `;
  const options = yargs
    .usage(usage)
    .option("new", { description: "Create New React app" })
    .option("init", { description: "Initialize Reactli for your Project" })
    .help(true);

  const args = await options.argv;
  const command = getCommand(args._[0]);

  if (command) {
    if (
      !isReactAvailable() &&
      !COMMANDS_ALLOWED_WITHOUT_REACT_APP.includes(args._[0] as string)
    )
      //  return console.log(
      //   chalk.bgRed("No React app detected"),
      //   "\nTry:",
      //   chalk.green("rc new <app_name>")
      // );

      command({
        args: args._ as string[],
        named: { ...args },
      });
  } else {
    console.log("Command not found\n");
    yargs.showHelp();
    process.exit(1);
  }
};

init();
