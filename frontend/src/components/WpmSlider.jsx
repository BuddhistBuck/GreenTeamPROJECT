import Slider from "@mui/material/Slider";
import Box from "@mui/material/Box";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { marks } from "../util/sliderValues";

const muiTheme = createTheme({
  palette: {
    primary: { main: "#419999" },
  },
});

export default function WpmSlider() {
  return (
    <Box
      sx={{
        height: "auto",
        alignItems: "center",
        display: "flex",
        flexDirection: "row",
        marginTop: "100px",
      }}
    >
      <br />
      <ThemeProvider theme={muiTheme}>
        <Slider
          defaultValue={150}
          orientation="vertical"
          step={50}
          marks={marks}
          min={100}
          max={300}
          color="primary"
        />
      </ThemeProvider>
    </Box>
  );
}
