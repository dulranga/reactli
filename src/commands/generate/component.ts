import chalk from "chalk";
import { getTemplate } from "../../templates";
import { toPascalCase } from "../../utils/change-case";
import { Command } from "../../utils/types";
import { storeReplacedTemplate } from "../../templates/store-replaced-template";
import path from "path";
import { existsSync } from "fs";

export const genComponent: Command = async ({ args }) => {
  const [name] = args;
  if (!name) return showHelp("No Component Name provided");
  if (typeof name !== "string")
    return showHelp("Give a name for the component");

  const parsedName = path.parse(name);

  const componentName = toPascalCase(parsedName.name);

  const replacer = getTemplate("components/default");

  const templateGenerator = replacer((template, compnentPath) => ({
    file: template.replace(/\$\$name/g, componentName),
    path: path.resolve(
      "components",
      parsedName.dir,
      compnentPath.replace(/\$\$name/g, componentName)
    ),
  }));

  if (existsSync(path.resolve("components", componentName)))
    return console.log(
      chalk.red("Directory Already exists. Try a different name")
    );

  for await (const replacedTemplate of templateGenerator) {
    await storeReplacedTemplate(replacedTemplate);
  }
};

const showHelp = (errorMsg: string) => {
  console.log(chalk.red(errorMsg));
  console.log("Try:\n", chalk.green("  rc g c <file_name>"));
};
