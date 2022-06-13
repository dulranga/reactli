import path from "path";
import { Replaced } from ".";
import fs from "fs/promises";
import { existsSync } from "fs";
import chalk from "chalk";

export const storeReplacedTemplate = async (
  template: Replaced,
  userPath?: any
) => {
  const parsedPath = path.parse(userPath ?? template.path);
  if (!parsedPath.dir.length) return await write(template, userPath);

  if (existsSync(parsedPath.dir)) return write(template, userPath);

  await fs.mkdir(parsedPath.dir, { recursive: true });
  return await write(template, userPath);
};

const write = async (template: Replaced, userPath?: any) => {
  const templatePath = userPath ?? template.path;
  try {
    console.log("Created File:", chalk.green(path.relative(".", templatePath)));

    await fs.writeFile(templatePath, template.file);
    return true;
  } catch (error) {
    return false;
  }
};
