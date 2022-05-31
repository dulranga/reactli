import path from "path";
import { Replaced } from ".";
import fs from "fs/promises";
import { existsSync } from "fs";
import chalk from "chalk";

export const storeReplacedTemplate = async (template: Replaced) => {
  const parsedPath = path.parse(template.path);
  if (!parsedPath.dir.length) return await write(template);

  if (existsSync(parsedPath.dir)) return write(template);

  await fs.mkdir(parsedPath.dir, { recursive: true });
  return await write(template);
};

const write = async (template: Replaced) => {
  try {
    console.log(
      "Created File:",
      chalk.green(path.relative(".", template.path))
    );

    await fs.writeFile(template.path, template.file);
    return true;
  } catch (error) {
    return false;
  }
};
