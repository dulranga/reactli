import path from "path";
import fs from "fs/promises";

export const getTemplate = async (id: string) => {
  const file = await fs.readFile(path.resolve(__dirname, id));
  return file.toString();
};
