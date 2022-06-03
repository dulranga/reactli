import chalk from "chalk";

export const showError = (msg: string) => {
  console.log(chalk.bgRed("ERROR:"), msg);
};
