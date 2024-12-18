import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Switch,
  Typography,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useThemeContext } from "../ThemeContext";
import { useTheme } from "@mui/material/styles";

const Settings = () => {
  const navigate = useNavigate();
  const { i18n } = useTranslation();
  const { darkMode, toggleTheme } = useThemeContext();
  const theme = useTheme();
  const [language, setLanguage] = useState(i18n.language || "en");

  const handleLanguageChange = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    const newLang = event.target.value as string;
    setLanguage(newLang);
    i18n.changeLanguage(newLang);
  };

  const handleLogout = () => {
    //localStorage.clear(); Quando adiciono o clear ele não loga mais quando coloco os dados na tela de login. Ou quando removo o sb-txtsgmgwkmeccygoqnak-auth-token
    localStorage.removeItem("user");
    localStorage.removeItem("session");
    navigate("/");
  };

  return (
    <Box
      sx={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 3,
        backgroundColor: theme.palette.background.default,
        color: theme.palette.text.primary,
      }}
    >
      <Button variant="contained" color="primary" onClick={() => navigate(-1)}>
        Voltar
      </Button>

      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <Typography variant="body1">Dark Mode</Typography>
        <Switch checked={darkMode} onChange={toggleTheme} color="secondary" />
      </Box>

      <FormControl sx={{ minWidth: 200 }}>
        <InputLabel id="language-selector-label">Idioma</InputLabel>
        <Select
          labelId="language-selector-label"
          value={language}
          onChange={handleLanguageChange}
        >
          <MenuItem value="en">Inglês</MenuItem>
          <MenuItem value="pt">Português</MenuItem>
          <MenuItem value="es">Espanhol</MenuItem>
        </Select>
      </FormControl>

      <Button
        variant="contained"
        color="secondary"
        onClick={handleLogout}
        sx={{ marginTop: 3 }}
      >
        Logout
      </Button>
    </Box>
  );
};

export default Settings;
