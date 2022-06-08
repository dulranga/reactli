export const replaceContent = (
  content: string,
  replaces: Record<string, string>
) => {
  let replacedContent = content;
  Object.entries(replaces).forEach(([key, value]) => {
    replacedContent = replacedContent.replaceAll(key, value);
  });

  return replacedContent;
};
