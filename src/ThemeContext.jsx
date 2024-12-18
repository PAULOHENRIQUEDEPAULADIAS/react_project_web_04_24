import React, { createContext, useState, useMemo, useContext } from "react";
import { createTheme, ThemeProvider as MuiThemeProvider } from "@mui/material";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: darkMode ? "dark" : "light",
          primary: {
            main: "#1976d2",
          },
          secondary: {
            main: "#dc004e",
          },
          background: {
            default: darkMode ? "#303030" : "#8ab3ed", // Fundo principal
            paper: darkMode ? "#1e1e1e" : "#ffffff", // Fundo de cartões
          },
        },
      }),
    [darkMode]
  );

  const toggleTheme = () => setDarkMode((prev) => !prev);

  return (
    <ThemeContext.Provider value={{ darkMode, toggleTheme }}>
      <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>
    </ThemeContext.Provider>
  );
};

// Custom hook para usar o contexto
export const useThemeContext = () => useContext(ThemeContext);
