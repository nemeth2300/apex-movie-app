import { Box, CircularProgress, Divider } from "@mui/material";
import ErrorDialog from "./ErrorDialog";
import MovieCard from "./MovieCard";
import MovieList from "./MovieList";
import { useURLQuery } from "../hooks/util";
import {
  useGetSimilarMovieQuery,
  useSearchMoviesQuery,
} from "../generated/gql";

type Props = {};

const AppContent: React.FC<Props> = () => {
  const urlQuery = useURLQuery();
  const text = urlQuery.get("text") || "";
  const id = urlQuery.get("id") || "";

  // Either one could run, but never concurrently
  const {
    data: searchData,
    loading: searchLoading,
    error: searchError,
  } = useSearchMoviesQuery({
    variables: { text },
    skip: !text || !!id,
  });
  const {
    data: similarData,
    loading: similarLoading,
    error: similarError,
  } = useGetSimilarMovieQuery({
    variables: { id },
    skip: !id || !!text,
  });

  const data = searchData?.searchMovies || similarData?.movie.similar;
  const loading = searchLoading || similarLoading;
  const error = searchError || similarError;
  const referenceMovie = similarData?.movie;

  return (
    <Box className="content" flex="auto" margin={4}>
      {referenceMovie && (
        <Box>
          <Box
            display="flex"
            fontSize="larger"
            justifyContent="center"
            alignItems="center"
          >
            <Box padding={2}>Similar movies to: </Box>
            <MovieCard movie={referenceMovie} />
          </Box>
          <Divider />
        </Box>
      )}
      {data?.length ? (
        <MovieList movies={data} />
      ) : (
        <Box textAlign="center">
          <p>No results found!</p>
        </Box>
      )}
      {loading && (
        <Box display="flex" justifyContent="center" alignItems="center">
          <CircularProgress />
        </Box>
      )}
      {error && <ErrorDialog message={error.message} />}
    </Box>
  );
};

export default AppContent;
