#!/usr/bin/env node

import yargs from "yargs";
import getCommand from "./commands";

const init = async () => {
  const usage = `Usage: rc <option> `;
  const options = yargs
    .usage(usage)
    .option("new", { description: "Create New React app" })
    .help(true);

  const args = await options.argv;
  const command = getCommand(args._[0]);
  console.log(command, args);

  if (command) {
    command(args as any);
  } else {
    yargs.showHelp();
  }
};

init();
