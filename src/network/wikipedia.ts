import axios from "axios";
import { wikipediaURL } from "../constants";
import { Page } from "../types";

export const requestWikiPage = async (query: string) => {
  const response = await axios.get<{ pages: Page[] }>(
    `/w/rest.php/v1/search/page`,
    {
      baseURL: wikipediaURL,
      params: {
        origin: "*",
        q: query,
      },
      withCredentials: false,
    }
  );
  const page = response.data.pages[0];
  return [page, null] as const;
};

export const requestWikiHtml = async (key: string) => {
  const response = await axios.get<string>(`/w/rest.php/v1/page/${key}/html`, {
    baseURL: wikipediaURL,
    params: {
      origin: "*",
    },
    withCredentials: false,
  });
  const parser = new DOMParser();
  const html = parser.parseFromString(response.data, "text/html");
  return [html, null] as const;
};
