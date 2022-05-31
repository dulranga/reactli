import path from "path";
import fs from "fs/promises";
import getFilePaths from "../utils/get-files";

export const getTemplate: GetTemplate = (id) => {
  const rootPath = path.resolve(__dirname, id);
  const filePaths = getFilePaths(rootPath);

  return async function* (replacer) {
    for await (const filePath of filePaths) {
      const relativePath = path.relative(rootPath, filePath);

      const template = await fs.readFile(filePath);
      const file = replacer(template.toString(), relativePath);
      yield file;
    }
  };
};

type Replacer = (
  replaceFn: (template: string, path: string) => Replaced
) => AsyncGenerator<Replaced>;

type GetTemplate = (id: string) => Replacer;

export type Replaced = { file: string; path: string };
