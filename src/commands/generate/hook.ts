import chalk from "chalk";
import { getTemplate } from "../../templates";
import { convertToAllCases } from "../../utils/change-case";
import { Command } from "../../utils/types";
import { storeReplacedTemplate } from "../../templates/store-replaced-template";
import path from "path";
import { COMPONENT_NAME_REGEX } from "../../constants/regex";
import { replaceContent } from "../../utils/replace-content";
import { existsSync } from "fs";

const PATH = "src/hooks";

export const genHook: Command = async ({ args }) => {
  const [name] = args;
  if (!name) return showHelp("No Hook Name provided");
  if (typeof name !== "string") return showHelp("Give a name for the Hook");

  const parsedName = path.parse(name.replace(/^use/, ""));
  const hookName = convertToAllCases(parsedName.name);

  if (!COMPONENT_NAME_REGEX.test(hookName.pascal))
    return showHelp(
      "Invalid name",
      chalk.bgRed.white(parsedName.name),
      "for the hook. Provide a valid string"
    );

  const templatePath = config.typescript ? "hooks/default-ts" : "hooks/default";

  const replacer = getTemplate(templatePath);

  const templateGenerator = replacer((template, componentPath) => {
    const replaces = {
      $name$: hookName.pascal,
      $name_kebab$: hookName.kebab,
    };

    return {
      file: replaceContent(template, replaces),
      path: path.resolve(
        PATH,
        parsedName.dir,
        replaceContent(componentPath, replaces)
      ),
    };
  });

  for await (const replacedTemplate of templateGenerator) {
    if (existsSync(replacedTemplate.path))
      return console.log(
        chalk.red("hookName Already exists. Try a different name")
      );
    await storeReplacedTemplate(replacedTemplate);
  }

  console.log(
    "\nHook",
    chalk.green("use" + hookName.pascal),
    "has successfully created."
  );
  console.log("You can access it on", path.resolve(PATH, parsedName.dir));
};

const showHelp = (...errorMsg: string[]) => {
  console.log(chalk.red(errorMsg.join(" ")));
  console.log("Try:\n", chalk.green("  rc g h <hook_name>"));
};
