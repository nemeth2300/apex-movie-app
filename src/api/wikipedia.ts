import axios, { AxiosError } from "axios";
import { WIKI_URL } from "../constants/urls";
import { Page } from "../types/wiki";

export const getWikiPage = async (query: string) => {
  const response = await axios.get<
    [{ pages: Page[] }, null] | [null, AxiosError]
  >(`/w/rest.php/v1/search/page`, {
    baseURL: WIKI_URL,
    params: {
      origin: "*",
      q: query,
      limit: 1,
    },
    withCredentials: false,
  });
  const [data, error] = response.data;
  if (error) return response.data;
  const page = data?.pages[0] || null;
  return [page, null] as const;
};

export const getWikiHtml = async (key: string) => {
  const response = await axios.get<[string, null] | [null, AxiosError]>(
    `/w/rest.php/v1/page/${key}/html`,
    {
      baseURL: WIKI_URL,
      params: {
        origin: "*",
      },
      withCredentials: false,
    }
  );
  const [data, error] = response.data;
  if (error) return response.data;
  const parser = new DOMParser();
  const html = parser.parseFromString(data!, "text/html");
  return [html, null] as const;
};
