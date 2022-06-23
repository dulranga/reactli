import chalk from "chalk";
import { getTemplate } from "../../templates";
import { convertToAllCases } from "../../utils/change-case";
import { Command } from "../../utils/types";
import { storeReplacedTemplate } from "../../templates/store-replaced-template";
import path from "path";
import { existsSync } from "fs";
import { COMPONENT_NAME_REGEX } from "../../constants/regex";
import { replaceContent } from "../../utils/replace-content";

const PATH = "src/components";

export const genComponent: Command<"path"> = async ({ args, named }) => {
  const [name] = args;
  if (!name) return showHelp("No Component Name provided");
  if (typeof name !== "string")
    return showHelp("Give a name for the component");

  const parsedName = path.parse(name);
  const componentName = convertToAllCases(parsedName.name);

  if (!COMPONENT_NAME_REGEX.test(componentName.pascal))
    return showHelp(
      "Invalid name",
      chalk.bgRed.white(parsedName.name),
      "for the component. Provide a valid string"
    );

  const templatePath = config.typescript
    ? "components/default-ts"
    : "components/default";

  const componentStoreRootPath = path.resolve(
    PATH,
    (named.path as string) ?? parsedName.dir
  );

  const replacer = getTemplate(templatePath);

  const templateGenerator = replacer((template, componentPath) => {
    const replaces = {
      $name$: componentName.pascal,
      $name_kebab$: componentName.kebab,
    };

    return {
      file: replaceContent(template, replaces),
      path: path.resolve(
        componentStoreRootPath,
        replaceContent(componentPath, replaces)
      ),
    };
  });

  if (existsSync(path.resolve(componentStoreRootPath, componentName.kebab)))
    return console.log(
      chalk.red("Directory Already exists. Try a different name")
    );

  for await (const replacedTemplate of templateGenerator) {
    await storeReplacedTemplate(replacedTemplate, componentStoreRootPath);
  }

  console.log(
    "\nComponent",
    chalk.green(componentName.pascal),
    "has successfully created."
  );
  console.log("You can access it on", componentStoreRootPath);
};

const showHelp = (...errorMsg: string[]) => {
  console.log(chalk.red(errorMsg.join(" ")));
  console.log("Try:\n", chalk.green("  rc g c <file_name>"));
};
