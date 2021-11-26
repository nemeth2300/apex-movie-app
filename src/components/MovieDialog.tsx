import React from "react";
import { Box, Dialog, Skeleton } from "@mui/material";
import { SearchMovieFragment } from "../gql";
import { wikiHtmlToFirstParagraph } from "../utils/wikipedia";
import { imdbURL, wikipediaURL } from "../constants";
import { Link } from "react-router-dom";
import { useWikiHtml, useWikiPage } from "../hooks";

type Props = {
  movie: SearchMovieFragment;
  open: boolean;
  onChange: (state: boolean) => any;
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
    <Dialog fullWidth maxWidth="md" open={open} onClose={() => onChange(false)}>
      <Box style={{ backgroundColor: "white" }}>
        <Box padding={4}>
          <Box display="flex" justifyContent="space-between">
            <img src="https://en.wikipedia.org/static/images/project-logos/enwiki.png" />
            <Box>
              <Box>
                <a
                  href={`${wikipediaURL}/wiki/${wikiPage?.key || ""}`}
                  target="_blank"
                >
                  Wikipedia
                </a>
              </Box>
              <Box>
                <a
                  href={`${imdbURL}/title/${movie.socialMedia?.imdb || ""}`}
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
      </Box>
    </Dialog>
  );
};

export default MovieDialog;
