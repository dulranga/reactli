import fs from "fs/promises";
import path from "path";

export default async function* getFilePaths(
  dir: string
): AsyncIterableIterator<string> {
  const dirents = await fs.readdir(dir, { withFileTypes: true });
  for (const dirent of dirents) {
    const res = path.resolve(dir, dirent.name);
    if (dirent.isDirectory()) {
      yield* getFilePaths(res);
    } else {
      yield res;
    }
  }
}
