import { Box, CircularProgress, Divider } from "@mui/material";
import ErrorDialog from "./ErrorDialog";
import MovieCard from "./MovieCard";
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

  const error = searchError || similarError;
  const movies = searchData?.searchMovies || similarData?.movie.similar;
  const loading = searchLoading || similarLoading;
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
      <Box
        className="movie-list"
        display="flex"
        flexWrap="wrap"
        justifyContent="center"
      >
        {error && <ErrorDialog message={error.message} />}
        {loading && <CircularProgress />}
        {movies?.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </Box>
    </Box>
  );
};

export default AppContent;
