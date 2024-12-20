import {
  Avatar,
  Box,
  Button,
  Grid,
  TextField,
  Typography,
} from "../components";
import { useAppContext } from "../context";
import { Link, useNavigate } from "react-router-dom";
import { signUp } from "../services/authcontext";
import { useState } from "react";
import { handleChange } from "../utils/core";
import { validateEmail, validPassword } from "../utils/validator";
import { WidthFull } from "@mui/icons-material";


const SignUp = () => {
  const navigate = useNavigate();
  const { showSnackMessage, showAlertMessage, supabase } = useAppContext();
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
    confirm_password: {
      value: "",
      error: null,
      helperText: null,
    },
  });

  const verifyRegister = async () => {
    const emailValidation = validateEmail(data.email.value);
    const passwordValidation = validPassword(data.password.value);

    setData((v) => ({
      ...v,
      email: {
        value: v.email.value,
        error: emailValidation.error,
        helperText: emailValidation.helperText,
      },
      password: {
        value: v.password.value,
        error: passwordValidation.error,
        helperText: passwordValidation.helperText,
      },
    }));

    if (emailValidation.error || passwordValidation.error) {
      return;
    }

    if (data.password.value !== data.confirm_password.value) {
      showAlertMessage("As senhas não coincidem", "error");
      return;
    }

    let { data: response, error } = await signUp(
      data.email.value,
      data.password.value,
      supabase
    );

    if (error) {
      if (
        error.toString().indexOf("AuthApiError: User already registered") !== -1
      ) {
        showSnackMessage("Usuário registrado");
      } else {
        showSnackMessage(error.toString());
      }
    } else {
      showSnackMessage("Usuário criado com sucesso!");
      navigate("/");
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      verifyRegister();
    }
  };

  

  return (
    <Box
      sx={{
        height: "100vh",
        paddingTop: 8,
        width: "100vw",
      }}
    >
      <Grid sx={styles.boxAdjustment} container>
        <Grid item xs={12}>
          <Avatar alt="Logo" />
        </Grid>
        <Grid sx={styles.marginTop } item xs={12}>
          <Typography variant="h3">Tela de Cadastro</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h5">
            Bem vindo seu app Gerenciador de Compras
          </Typography>
        </Grid>
        <Grid sx={styles.marginTop} item xs={12}>
          <TextField
            label="E-mail"
            fullWidth
            onChange={(event) =>
              handleChange(data, setData, event.target.value, "email")
            }
            value={data.email.value}
            error={data.email.error}
            helperText={data.email.helperText}
          />
        </Grid>
        <Grid sx={styles.marginTop} item xs={12}>
          <TextField
            label="Senha"
            fullWidth
            onChange={(event) =>
              handleChange(data, setData, event.target.value, "password")
            }
            type="password"
            error={data.password.error}
            helperText={data.password.helperText}
            value={data.password.value}
          />
        </Grid>
        <Grid sx={styles.marginTop} item xs={12}>
          <TextField
            label="Confirmar Senha"
            fullWidth
            onChange={(event) =>
              handleChange(
                data,
                setData,
                event.target.value,
                "confirm_password"
              )
            }
            type="password"
            value={data.confirm_password.value}
            error={data.confirm_password.error}
            helperText={
              data.confirm_password.error ? "As senhas não coincidem" : ""
            }
            onKeyPress={handleKeyPress}
          />
        </Grid>
        <Grid sx={styles.marginTop} item xs={12}>
          <Link to="/">Já tem conta? Entre aqui</Link>
        </Grid>

        <Grid sx={styles.marginTop} item xs={12}>
          <Button fullWidth={true} onClick={verifyRegister}>
            Registrar
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

const styles = {
  boxAdjustment: {
    padding: "16px",
    display: "flex",
    flexDirection: "column", 
    gap: "16px", 
    alignItems: "center",
    justifyContent: "center",
    width: "100dw",
  },
  marginTop: {
    marginTop: 4,
  },
};


export default SignUp;
