type Props<Named extends keyof any = string> = {
  args: string[];
  named: Record<Named, string | number | boolean | unknown>;
};

export type Command<T extends keyof any = any> = (props: Props<T>) => void;

export type Commands = Record<string, Command>;

export type Nullable<T> = T | null;
