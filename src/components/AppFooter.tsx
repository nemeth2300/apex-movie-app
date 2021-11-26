import { Box } from "@mui/material";

type Props = {};

const AppFooter: React.FC<Props> = () => {
  return (
    <Box
      className="footer"
      minHeight={24}
      padding={2}
      textAlign="center"
      fontSize="larger"
    >
      Németh Péter, 2021.11.26
    </Box>
  );
};

export default AppFooter;
