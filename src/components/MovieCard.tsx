import React, { useState } from "react";
import { Box, Chip } from "@mui/material";
import { Star } from "@mui/icons-material";
import MovieDialog from "./MovieDialog";
import { SearchMovieFragment } from "../generated/gql";

type Props = {
  movie: SearchMovieFragment;
};
const MovieCard: React.FC<Props> = ({ movie }) => {
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <Box className="movie-card" maxWidth={480}>
      <Box padding={1} textAlign="center" fontSize="larger">
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            setModalOpen(true);
          }}
        >
          {movie.name}
        </a>
      </Box>
      <MovieDialog
        movie={movie}
        open={modalOpen}
        onChange={(state) => setModalOpen(state)}
      />
      <Box display="flex">
        <Box>
          <img src={movie.poster?.small} />
          <Box textAlign="center">
            <Box>{movie.score}</Box>
            <Star />
          </Box>
        </Box>
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="space-between"
          width="100%"
        >
          <Box padding={2}>
            <Box>{movie.overview}</Box>
          </Box>
          <Box padding={1} display="flex" flexWrap="wrap">
            {movie.genres.map((genre) => (
              <Box key={genre.id} margin={1}>
                <Chip label={genre.name} />
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default MovieCard;
