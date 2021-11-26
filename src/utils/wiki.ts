export const wikiHtmlToFirstParagraph = (document: Document) => {
  const getElementByXpath = (path: string) => {
    return document.evaluate(
      path,
      document,
      null,
      XPathResult.FIRST_ORDERED_NODE_TYPE,
      null
    ).singleNodeValue;
  };
  const possiblePaths = [
    "//html/body/section[1]/p[2]",
    "/html/body/section[1]/p[3]",
    "//html/body/section[1]/p[1]",
  ];
  const text = possiblePaths
    .map((path) => getElementByXpath(path) as HTMLParagraphElement | null)
    .map((node) => node?.innerText)
    .find((text) => text);
  return text || "";
};
