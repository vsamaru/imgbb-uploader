import React from "react";
const { createMuiTheme, ThemeProvider } = require("@material-ui/core/styles")
//import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#4299E1",
    },
  },
  overrides: {
    MuiButton: {
      root: {
        textTransform: "capitalize",
      },
    },
  },
});

export const MuiThemeProvider = ({ children }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);
