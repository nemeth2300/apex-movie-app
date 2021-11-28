import { initialiseAxios } from "../../api/index";
import { getWikiHtml, getWikiPage } from "../../api/wikipedia";
import { wikiHtmlToFirstParagraph } from "../../utils/wiki";

// Would not make sense with mocks
// A lesson to learn: innerText is undefined in JSDOM, which Jest/SSR uses by default
test(
  "Wikipedia API Works and the utility function selects a paragraph that has content",
  async () => {
    initialiseAxios();
    const [page, pageError] = await getWikiPage("Batman Movie 1989");
    expect(pageError).toBeNull();
    if (!page) return fail();
    const [html, htmlError] = await getWikiHtml(page.key);
    expect(htmlError).toBeNull();
    const text = wikiHtmlToFirstParagraph(html!);
    expect(text).toBeTruthy();
  },
  1000 * 60
);
