import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { SearchMovieFragment } from "./gql";
import { Page } from "./types";
import { requestWikiHtml, requestWikiPage } from "./network/wikipedia";

export const useURLQuery = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  return params;
};

export const useWikiHtml = (key: string, lazy: boolean) => {
  const [data, setData] = useState<Document | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const query = async (key: string) => {
    setLoading(true);
    const [data, error] = await requestWikiHtml(key);
    if (data) setData(data);
    if (error) setError(false);
    setLoading(false);
  };
  useEffect(() => {
    if (lazy && !data) query(key);
  }, [key, lazy]);
  return { data, loading, error } as const;
};

export const useWikiPage = (movie: SearchMovieFragment, lazy: boolean) => {
  const [data, setData] = useState<Page | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const query = async (movie: SearchMovieFragment) => {
    setLoading(true);
    const [data, err] = await requestWikiPage(
      `Movie ${movie.name} ${movie.releaseDate.slice(0, 10)}`
    );
    if (data) setData(data);
    if (error) setError(false);
    setLoading(false);
  };
  useEffect(() => {
    if (lazy && !data) query(movie);
  }, [movie.name, lazy]);
  return { data, loading, error } as const;
};
