import { Box } from "@mui/material";
import AppHeader from "./AppHeader";
import AppFooter from "./AppFooter";
import AppContent from "./AppContent";

type Props = {};

const App: React.FC<Props> = () => {
  return (
    <Box
      className="app"
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      minHeight="100vh"
    >
      <AppHeader />
      <AppContent />
      <AppFooter />
    </Box>
  );
};

export default App;
