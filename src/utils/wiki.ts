export const getElementByXpath = (doc: Document, path: string) => {
  return doc.evaluate(
    path,
    doc,
    null,
    XPathResult.FIRST_ORDERED_NODE_TYPE,
    null
  ).singleNodeValue;
};

export const wikiHtmlToFirstParagraph = (doc: Document) => {
  const possiblePaths = [
    "/html/body/section[1]/p[2]",
    "/html/body/section[1]/p[3]",
    "/html/body/section[1]/p[1]",
  ];

  const text = possiblePaths
    .map((path) => getElementByXpath(doc, path) as HTMLParagraphElement | null)
    .map((node) => node?.textContent)
    .find((text) => text && text?.length > 16);
  return text || "";
};
