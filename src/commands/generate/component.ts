import chalk from "chalk";
import { getTemplate } from "../../templates";
import { toPascalCase } from "../../utils/change-case";
import { Command } from "../../utils/types";
import { storeReplacedTemplate } from "../../templates/store-replaced-template";

export const genComponent: Command = async ({ args }) => {
  const [name] = args;
  if (!name) return showHelp("No Component Name provided");

  const componentName = toPascalCase(name as string);

  const replacer = getTemplate("components/default");

  const templateGenerator = replacer((template, path) => ({
    file: template.replace(/\$\$name/g, componentName),
    path: path.replace(/\$\$name/g, componentName),
  }));

  for await (const replacedTemplate of templateGenerator) {
    storeReplacedTemplate(replacedTemplate);
  }
};

const showHelp = (errorMsg: string) => {
  console.log(chalk.red(errorMsg));
  console.log("Try:\n", chalk.green("  rc g c <file_name>"));
};
