import { execSync } from "child_process";

export const isReactAvailable = () => {
  const buffer = execSync("npm ls --json");
  const info: Info = JSON.parse(buffer.toString());
  if (info.dependencies && Object.hasOwn(info.dependencies, "react")) {
    return true;
  }
  return false;
};

export interface Info {
  version: string;
  name: string;
  problems: string[];
  dependencies?: Dependencies;
}

export interface Dependencies {
  react?: Dependancy;
}

export interface Dependancy {
  version: string;
  resolved: string;
}
