import { createTheme } from "@mui/material/styles";

// Create themes for list buttons on practice page (dark mode)
const themeListButtonsDark = createTheme({
  palette: {
    primary: { main: "#000000" },
    secondary: { main: "#ffffff" },
  },
});

export default themeListButtonsDark;
