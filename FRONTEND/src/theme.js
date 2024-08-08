import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#3559E9",
    },
    secondary: {
      main: "#6A7177",
    },
    error: {
      main: "#D02533",
    },
    blue: {
      main: "#335CF",
    },
    lightBlue: {
      main: "#38D9E5",
    },
    purple: {
      main: "#7D52F4",
    },
    green: {
      main: "#3CE5B8",
    },

    customColors: {
      blue: "#335CF",
      lightBlue: "#38D9E5",
      purple: "#7D52F4",
      green: "#3CE5B8",
    },
  },
  typography: {
    fontFamily: "Inter, sans-serif", // Use Inter as the default font family
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 700,
  },
});

export default theme;
