export enum Errors {
  DIRECTORY_EXISTS,
}

export default class Error {
  constructor(public code: number, public message: string) {}
}
