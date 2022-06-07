import {
  convertToAllCases,
  toKebabCase,
  toPascalCase,
  toSnakeCase,
} from "../src/utils/change-case";

describe("Change Cases of strings", () => {
  test("Pascal Case", () => {
    const output = "ToPascalCase";
    expect(toPascalCase("ToPascalCase")).toBe(output);
    expect(toPascalCase("to pascal case")).toBe(output);
    expect(toPascalCase("to-pascal-case")).toBe(output);
    expect(toPascalCase("to_pascal_case")).toBe(output);
    expect(toPascalCase("toPascal_case")).toBe(output);

    expect(toPascalCase("topascal_case")).toBe("TopascalCase");
  });

  test("Snack Case", () => {
    const output = "snack_case";
    expect(toSnakeCase("snack_case")).toBe(output);
    expect(toSnakeCase("snack-case")).toBe(output);
    expect(toSnakeCase("Snack-case")).toBe(output);
    expect(toSnakeCase("Snack-Case")).toBe(output);
    expect(toSnakeCase("SnackCase")).toBe(output);
  });

  test("Kebab Case", () => {
    const output = "convert-to-kebab";

    expect(toKebabCase("convert to kebab")).toBe(output);
    expect(toKebabCase("convert-to-kebab")).toBe(output);
    expect(toKebabCase("convert_to_kebab")).toBe(output);
    expect(toKebabCase("ConvertToKebab")).toBe(output);
    expect(toKebabCase("Convert\nto\nkebab")).toBe(output);
  });

  test("Convert string to all cases", () => {
    const result = convertToAllCases("hello world");
    expect(result.pascal).toBe("HelloWorld");
    expect(result.snake).toBe("hello_world");
    expect(result.kebab).toBe("hello-world");
  });
});
