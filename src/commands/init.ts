import inquirer from "inquirer";
import fs from "fs/promises";
import { Command } from "../utils/types";
import { Answers, prompts } from "./new-app/data";
import { showError } from "../utils/show-error";
import chalk from "chalk";

export const CONFIG_NAME = "reactli.config.json";

const generateInitialConfig = async (name: string, answers?: Answers) => {
  const config = {
    name,
    typescript: answers?.typescript ?? false,
    css: answers?.css ?? "css",
    testing: answers?.testing ?? "",
    templates: {
      component: {
        default: {
          path: "src/components",
        },
      },
    },
  };

  await fs.writeFile(CONFIG_NAME, JSON.stringify(config, null, 2));
  console.log(chalk.green("Created"), chalk.bold.green(CONFIG_NAME));
  return config;
};

export const init: Command<"yes" | "y"> = async ({ named }) => {
  try {
    const file = await fs.readFile("package.json");
    const pkgJSON = JSON.parse(file.toString());
    const appName = pkgJSON?.name;

    if (named.y || named.yes) {
      return await generateInitialConfig(appName);
    }

    const answers = await inquirer.prompt(prompts);
    await generateInitialConfig(appName, answers);
  } catch (error: any) {
    if (error.code === "ENOENT") {
      showError(
        "No React app detected. Please run this command at the root of your project"
      );
    }
  }
};

export const createReactliConfig = async () => {
  const raw = await fs.readFile(CONFIG_NAME);
  const info = JSON.parse(raw.toString());
  return info;
};
