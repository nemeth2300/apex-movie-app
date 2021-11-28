import React from "react";
import { Link } from "react-router-dom";
import { Box, Dialog, Skeleton } from "@mui/material";
import { IMDB_URL, WIKI_URL } from "../constants/urls";
import { wikiHtmlToFirstParagraph } from "../utils/wiki";
import { useWikiHtml, useWikiPage } from "../hooks/wiki";
import { SearchMovieFragment } from "../generated/gql";

type Props = {
  movie: SearchMovieFragment;
  open: boolean;
  onChange: (state: boolean) => void;
};

const MovieDialog: React.FC<Props> = ({ movie, open, onChange }) => {
  const { data: wikiPage, loading: wikiPageLoading } = useWikiPage(movie, open);
  const { data: wikiHtml, loading: wikiHtmlLoading } = useWikiHtml(
    wikiPage?.key || "",
    !!wikiPage
  );
  const loading = wikiPageLoading || wikiHtmlLoading;
  const text = wikiHtml ? wikiHtmlToFirstParagraph(wikiHtml) : "";

  return (
    <Dialog
      className="movie-dialog"
      fullWidth
      maxWidth="md"
      open={open}
      onClose={() => onChange(false)}
    >
      <Box padding={4}>
        <Box display="flex" justifyContent="space-between">
          <img src="https://en.wikipedia.org/static/images/project-logos/enwiki.png" />
          <Box>
            <Box>
              <a
                href={`${WIKI_URL}/wiki/${wikiPage?.key || ""}`}
                target="_blank"
              >
                Wikipedia
              </a>
            </Box>
            <Box>
              <a
                href={`${IMDB_URL}/title/${movie.socialMedia?.imdb || ""}`}
                target="_blank"
              >
                IMDB
              </a>
            </Box>
            <Box>
              <Link to={`/movies?id=${movie.id}`}>Related</Link>
            </Box>
          </Box>
        </Box>
        <Box minHeight={240}>
          {loading && (
            <>
              <Skeleton animation="pulse" />
              <Skeleton animation="pulse" />
              <Skeleton animation="pulse" />
            </>
          )}
          {text}
        </Box>
      </Box>
    </Dialog>
  );
};

export default MovieDialog;
