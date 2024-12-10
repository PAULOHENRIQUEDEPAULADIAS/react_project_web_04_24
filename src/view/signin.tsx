import {
  Avatar,
  Box,
  Button,
  Grid,
  TextField,
  Typography,
} from "../components/index";
import { useAppContext } from "../context";
import { Link, useNavigate } from "react-router-dom";
import { signIn } from "../services/authcontext";
import { useState } from "react";
import { handleChange } from "../utils/core";
import { AuthProvider, useAuth } from "../services/authcontext.jsx";

const SignIn: React.FC = () => {
  const navigate = useNavigate();
  const { showSnackMessage, showAlertMessage, supabase } = useAppContext();
  const { login } = useAuth(); 

  const [data, setData] = useState({
    email: {
      value: "",
      error: null,
      helperText: null,
    },
    password: {
      value: "",
      error: null,
      helperText: null,
    },
  });

  const verifyLogin = async () => {
    let { data: response, error } = await signIn(
      data.email.value,
      data.password.value,
      supabase
    );
  
    if (error) {
      console.error("Erro de login:", error.message);
      showSnackMessage("Dados de usuário inválidos");
    } else {
      if (response.session && response.user) {
        localStorage.setItem("session", JSON.stringify(response.session)); 
        localStorage.setItem("user", JSON.stringify(response.user)); 
        
        
        login();
        
        navigate("/home");
      } else {
        console.error("Login realizado, mas sem dados de usuário.");
        showSnackMessage("Erro inesperado durante o login.");
      }
    }
  };
  

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      verifyLogin();
    } 
  };

  return (
    <Box
      sx={{
        height: "100vh",
        paddingTop: 8,
      }}
    >
      <Grid sx={styles.boxAdjustment} container={true}>
        <Grid sx={styles.centerBox} item={true} size={{ xs: 12 }}>
          <Avatar alt="Logo" />
        </Grid>
        <Grid
          sx={{
            ...styles.centerBox,
            ...styles.marginTop,
          }}
          item={true}
          size={{ xs: 12 }}
        >
          <Typography variant="h3">Login</Typography>
        </Grid>
        <Grid sx={styles.centerBox} item={true} size={{ xs: 12 }}>
          <Typography variant="h5">
            Bem vindo seu app Gerenciador de Compras
          </Typography>
        </Grid>
        <Grid sx={styles.marginTop} item={true} size={{ xs: 12 }}>
          <TextField
            label="E-mail"
            fullWidth={true}
            onChange={(event) =>
              handleChange(data, setData, event.target.value, "email")
            }
            value={data.email.value}
          />
        </Grid>
        <Grid sx={styles.marginTop} item={true} size={{ xs: 12 }}>
          <TextField
            label="Senha"
            fullWidth={true}
            onChange={(event) =>
              handleChange(data, setData, event.target.value, "password")
            }
            type="password"
            onKeyPress={handleKeyPress}
            value={data.password.value}
          />
        </Grid>
        <Grid
          sx={{
            ...styles.centerBox,
            ...styles.marginTop,
          }}
          item={true}
          size={{ xs: 12 }}
        >
          <Link to="/signup">Cadastrar</Link>
        </Grid>
        <Grid sx={styles.marginTop} item={true} size={{ xs: 12 }}>
          <Button fullWidth={true} onClick={verifyLogin}>
            Entrar
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

const styles = {
  centerBox: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  boxAdjustment: {
    padding: 2,
  },
  marginTop: {
    marginTop: 4,
  },
};

export default SignIn;
