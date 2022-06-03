import inquirer from "inquirer";
import fs from "fs/promises";
import { Command } from "../utils/types";
import { Answers, prompts } from "./new-app/data";
import { showError } from "../utils/show-error";

const generateInitialConfig = async (name: string, answers?: Answers) => {
  const config = {
    name,
    typescript: answers?.typescript ?? false,
    templates: {
      component: {
        default: {
          path: "src/components",
        },
      },
    },
  };
  console.log(__dirname);

  await fs.writeFile("reactli.config.json", JSON.stringify(config));
};

export const init: Command<"yes" | "y"> = async ({ named }) => {
  try {
    const file = await fs.readFile("package.json");
    const pkgJSON = JSON.parse(file.toString());
    const appName = pkgJSON?.name;

    if (named.y || named.yes) {
      await generateInitialConfig(appName);
      return;
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
