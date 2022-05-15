import { createTheme } from "@mui/material/styles";

// Create themes for slider components on practice page
const themeSlider = createTheme({
  palette: {
    primary: { main: "#a9cbd6" },
    secondary: { main: "#a9cbd6" },
  },
  components: {
    MuiSlider: {
      styleOverrides: {
        markLabel: {
          color: "#000000",
        },
      },
    },
  },
});

export default themeSlider;
