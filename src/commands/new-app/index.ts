import chalk from "chalk";
import inquirer from "inquirer";
import fs from "fs/promises";
import { Command } from "../../utils/types";
import { execSync, exec, ExecException } from "child_process";
import { showError } from "../../utils/show-error";
import { appTypes, prompts } from "./data";

const newApp: Command<"typescript"> = async ({ args }) => {
  const [_cmd, appName] = args;

  if (!appName) {
    const msg = `
${chalk.red("No App name provided")}
Try:
  ${chalk.green("rc new hello-world")}
  `;
    return console.log(msg);
  }

  const answers = await inquirer.prompt(prompts);

  try {
    const app = appTypes.find((app) => app.value === answers.type);
    const genCommand = app?.getCommand?.(appName, answers);

    if (!genCommand)
      return showError("No generate command found for the choosed app");

    await fs.mkdir(appName);
    process.chdir(appName);

    await init();
    execSync(genCommand, { windowsHide: false });
  } catch (error: any) {
    showError(error.message);
    // const answers = await inquirer.prompt({
    //   name: "stop",
    //   type: "confirm",
    //   message: `Project creation failed. Do you want to remove ${appName} Directory`,
    // });
    // if (answers.stop) {
    //   process.chdir("..");
    //   console.log("Delete simulation");
    // }
  }
};

const onCallback = (msg: string) => (err: ExecException | null) => {
  if (err) return showError(err.message);
  console.log(chalk.green(msg));
};

const init = async () => {
  return new Promise((res) => {
    exec("git init", onCallback("Initialized Git repository"));
    exec("npm init --y", onCallback("Added Package.json"));
    res(null);
  });
};

export default newApp;
