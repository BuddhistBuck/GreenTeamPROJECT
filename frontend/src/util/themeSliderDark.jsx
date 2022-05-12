import { createTheme } from "@mui/material/styles";

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
