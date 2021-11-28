import { Box } from "@mui/material";
import MovieCard from "./MovieCard";
import { SearchMovieFragment } from "../generated/gql";

type Props = {
  movies: SearchMovieFragment[];
};

const MovieList: React.FC<Props> = ({ movies }) => {
  return (
    <Box
      className="movie-list"
      display="flex"
      flexWrap="wrap"
      justifyContent="center"
    >
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </Box>
  );
};

export default MovieList;
