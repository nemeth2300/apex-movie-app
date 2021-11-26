export const wikiHtmlToFirstParagraph = (document: Document) => {
  const firstParagraph =
    document
      .getElementsByTagName("html")
      .item(0)
      ?.getElementsByTagName("body")
      .item(0)
      ?.getElementsByTagName("section")
      .item(0)
      ?.getElementsByTagName("p")
      .item(1) ||
    document
      .getElementsByTagName("html")
      .item(0)
      ?.getElementsByTagName("body")
      .item(0)
      ?.getElementsByTagName("section")
      .item(0)
      ?.getElementsByTagName("p")
      .item(0);
  const text = firstParagraph?.innerText || "";
  return text;
};
