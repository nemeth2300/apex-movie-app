import axios, { AxiosError } from "axios";
import { WIKI_URL } from "../constants/urls";
import { Page } from "../types/wiki";

type Monad<T> = readonly [T, null] | readonly [null, AxiosError];

export const getWikiPage = async (
  query: string
): Promise<Monad<Page | null>> => {
  const response = await axios.get<Monad<{ pages: Page[] }>>(
    `/w/rest.php/v1/search/page`,
    {
      baseURL: WIKI_URL,
      params: {
        origin: "*",
        q: query,
        limit: 1,
      },
      withCredentials: false,
    }
  );
  const [data, error] = response.data;
  if (error) return response.data;
  const page = data?.pages[0] || null;
  return [page, null];
};

export const getWikiHtml = async (key: string): Promise<Monad<Document>> => {
  const response = await axios.get<Monad<string>>(
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
  return [html, null];
};
