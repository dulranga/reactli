declare global {
  /** ### Custom Config in `reactli.config.json`
   * Any script that's included as a command in `COMMANDS_ALLOWED_WITHOUT_REACT_APP` at *src/index.ts* <br>
   * will not able to use this
   */
  var config: {
    name: string;
    typescript: boolean;
    css: string;
    testing: string;
    templates: {
      component: {
        default: {
          path: string;
        };
      };
    };
  };
}

export {};
