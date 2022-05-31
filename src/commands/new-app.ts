import chalk from "chalk";
import inquirer from "inquirer";
import { Command } from "../utils/types";

const newApp: Command<"typescript"> = async ({ args, named }) => {
  const [_cmd, appName] = args;

  if (!appName) {
    const msg = `
${chalk.red("No App name provided")}
Try:
  ${chalk.green("rc new hello-world")}
  `;
    return console.log(msg);
  }

  const response = await inquirer.prompt([
    {
      name: "type",
      type: "list",
      message: "What type of react app you wish to create",
      choices: appTypes,
    },
    {
      name: "typescript",
      type: "confirm",
      message: "Do you wish to add typescript",
      default: false,
    },
    {
      name: "css",
      type: "list",
      message: "What type of CSS framework do you use",
      default: "css",
      choices: [
        { name: "CSS (no framework)", value: "css" },
        { name: "SCSS", value: "scss" },
        { name: "Styled Components", value: "styled" },
        { name: "Tailwind", value: "tailwind" },
      ],
    },
    {
      name: "testing",
      type: "list",
      message: "What type of testing framework you use",
      choices: [
        { name: "React Testing library", value: "testing_lib" },
        { name: "Jest", value: "jest" },
        { name: "Karma", value: "karma" },
      ],
    },
  ]);

  console.log(response);
};

const appTypes: { name: string; value: string }[] = [
  { value: "cra", name: "CRA (create-react-app)" },
];
export default newApp;
