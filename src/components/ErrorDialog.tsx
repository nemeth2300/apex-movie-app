import React from "react";
import { Box, Alert, AlertTitle } from "@mui/material";

type Props = {
  message: string;
};

const ErrorDialog: React.FC<Props> = ({ message }) => {
  return (
    <Box position="absolute" margin={4} width="80vw" borderRadius={2}>
      <Alert severity="error">
        <AlertTitle>Error during network request!</AlertTitle>
        {message}
      </Alert>
    </Box>
  );
};

export default ErrorDialog;
