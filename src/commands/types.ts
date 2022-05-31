type Props<Named extends keyof any = string> = {
  args: (string | number)[];
  named: Record<Named, string | number | boolean | unknown>;
};

export type Command<T extends keyof any = any> = (props: Props<T>) => void;

export type Commands = Record<string, Command>;
