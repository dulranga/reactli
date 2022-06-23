import { QuestionCollection } from "inquirer";

export interface Answers {
  type: string;
  typescript: boolean;
  css: string;
  testing: string;
}

type AppType = {
  name: string;
  value: string;
  getCommand?: (name: string, data: Answers) => string;
};

export const appTypes: AppType[] = [
  {
    value: "cra",
    name: "CRA (create-react-app)",
    getCommand(_, answers) {
      const basic = `npx create-react-app . `;
      if (answers.typescript === true)
        return basic + "--template cra-template-typescript";
      return basic;
    },
  },
  { value: "next", name: "Next.JS" },
];

export const prompts: QuestionCollection<Answers> = [
  {
    name: "type",
    type: "list",
    message: "What is the type of your react app",
    choices: appTypes,
  },
  {
    name: "typescript",
    type: "confirm",
    message: "Does your project use typescript",
    default: false,
  },
  {
    name: "css",
    type: "list",
    message: "What type of CSS framework this project use",
    default: "css",
    choices: [
      { name: "CSS (no framework)", value: "css" },
      { name: "SCSS", value: "scss" },
      { name: "Styled Components", value: "styled" },
      { name: "Tailwind", value: "tailwind" },
    ],
  },
  {
    name: "testing",
    type: "list",
    message: "What type of testing framework this project use",
    choices: [
      { name: "React Testing library", value: "testing_lib" },
      { name: "Jest", value: "jest" },
      { name: "Karma", value: "karma" },
    ],
  },
];
