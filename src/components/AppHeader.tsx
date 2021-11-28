import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, Toolbar, Input, InputAdornment } from "@mui/material";
import { SearchRounded } from "@mui/icons-material";

interface Props {}

const AppHeader: React.FC<Props> = () => {
  const [text, setText] = useState("");
  const navigate = useNavigate();

  return (
    <Box className="header" display="flex" justifyContent="center">
      <Toolbar>
        <Box
          className="header-input-container"
          display="flex"
          padding={1}
          borderRadius={1}
        >
          <Input
            id="search-input"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Search"
            startAdornment={
              <InputAdornment position="start">
                <SearchRounded />
              </InputAdornment>
            }
          />
          <Box marginLeft={1}>
            <Button
              id="search-button"
              variant="contained"
              onClick={() => navigate(`/movies?text=${text}`)}
            >
              Search
            </Button>
          </Box>
        </Box>
      </Toolbar>
    </Box>
  );
};

export default AppHeader;
