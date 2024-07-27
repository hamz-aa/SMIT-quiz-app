// src/theme/theme.js

import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2",
    },
    background: {
      default: "#f4f6f8",
    },
    text: {
      primary: "#34495E",
      secondary: "#6c757d",
    },
  },
  navGray: "#f8f9fa",
});

export default theme;
