import { Box } from "@mui/material";
import AppHeader from "./components/AppHeader";
import AppFooter from "./components/AppFooter";
import AppContent from "./components/AppContent";

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
