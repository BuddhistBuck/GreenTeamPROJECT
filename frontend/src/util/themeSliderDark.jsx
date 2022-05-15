import { createTheme } from "@mui/material/styles";

// Create themes for slider components on practice page (dark mode)
const themeSliderDark = createTheme({
  palette: {
    primary: { main: "#003459" },
    secondary: { main: "#003459" },
  },
  components: {
    MuiSlider: {
      styleOverrides: {
        markLabel: {
          color: "#ffffff",
        },
      },
    },
  },
});

export default themeSliderDark;
