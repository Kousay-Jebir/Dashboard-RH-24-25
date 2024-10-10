import { green } from "@mui/material/colors";
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#3559E9",
    },
    secondary: {
      main: "#6A7177",
    },
    neutral: {
      main: "#0C0F12",
      light: "#E9EAEB",
      normal: "#6A7177",
    },
    blue: {
      main: "#2547D0",
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
    white: {
      main: "#FFFFFF",
    },

    success:{
      main:"#D0FBE9",
      text:"#1DAF61"
    },
    warning:{
      main:"#FFE3D5",
      text:"#ffa726"
    },
    error:{
      text:"#FFD5D8",
      main:"#E93544"
    },

    customColors: {
      blue: "#335CF",
      lightBlue: "#38D9E5",
      purple: "#7D52F4",
      green: "#3CE5B8",
    },
    text: {
      main: "#0C0F12 ",
      light: "#6A7177",
      dark: "#000",
    },
  },
  typography: {
    fontFamily: "Inter",
    light:300,
    regular: 400,
    medium: 500,
    extraMeduim: 570,
    bold: 700,
  },

});

export default theme;
