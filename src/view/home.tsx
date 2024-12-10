import { IconButton, Fab } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Grid, Avatar, Box, Typography, CustomList } from "../components";
import Logo from "../img/logo.png";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { get, list } from "../services/supabasedb";
import { calculateDuration, getUser } from "../utils/core";
import { useAppContext } from "../Context";
import { CardNewItem } from "../components";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Swiper, SwiperSlide } from "swiper/react";

import { ACTIONS } from "../constants/actions.js";

const Home: React.FC = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const user = getUser();
  const [data, setData] = useState([]);
  const [profile, setProfile] = useState({});

  const navigateToAddAction = () => {
    navigate("/add-action");
  };

  const navigateToAddCategory = () => {
    navigate("/add-category");
  };

  return (
    <Box
      sx={{
        height: "100vh",
        padding: "2em",
        display: "flex",
        justifyContent: "center",
        background: `linear-gradient(to bottom, transparent 10%, #3b79f5 70%)`, // Aplica o gradiente
      }}
    >
      <Grid
        container
        direction="column"
        spacing={4}
        alignItems="center"
        sx={{ maxWidth: "600px", width: "100%" }}
      >
        {/* Logo centralizado dentro de um círculo */}
        <Grid item sx={{ width: "100%" }}>
          <Box
            sx={{ display: "flex", justifyContent: "center", width: "100%" }}
          >
            <Avatar
              alt="Logo"
              src={Logo}
              sx={{
                width: 120, // Tamanho do logo
                height: 120, // Tamanho do logo
                borderRadius: "50%", // Torna o logo circular
                border: `5px solid ${theme.palette.primary.main}`, // Borda ao redor do logo
              }}
            />
          </Box>
          <p sx={{ color: "${theme.palette.primary.main}" }}>
            Aplicativo gerenciador de compras
          </p>
        </Grid>

        {/* Carrossel de ACTIONS */}
        <Grid
          item
          container
          spacing={1}
          sx={{
            overflow: "hidden",
            width: "100%",
            border: `2px solid ${theme.palette.primary.main}`, // Adiciona uma borda ao redor do carrossel
            borderRadius: "8px", // Bordas arredondadas
            padding: "10px", // Adiciona um pouco de padding dentro do carrossel
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", // Adiciona uma leve sombra para destacar
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Swiper
            spaceBetween={0} // Espaçamento entre os itens
            slidesPerView="3" // Mostra o número de slides automaticamente
            loop={true} // Faz com que o carrossel seja infinito
            centeredSlides={true} // Centraliza o slide atual
            breakpoints={{
              1024: {
                slidesPerView: 3, // 3 itens para telas grandes
              },
              768: {
                slidesPerView: 2, // 2 itens para telas médias
              },
              480: {
                slidesPerView: 1, // 1 item para telas pequenas
              },
            }}
          >
            {ACTIONS.map((action, index) => (
              <SwiperSlide key={index}>
                <CardNewItem
                  title={action.title}
                  Icon={action.Icon}
                  color={action.color}
                  actionType={action.actionType}
                  isEmpty={false}
                />
              </SwiperSlide>
            ))}

            {/* Slide extra para "Adicionar Categoria" */}
            <SwiperSlide>
              <CardNewItem
                title="Adicionar Categoria"
                Icon={null}
                color={theme.palette.primary.main}
                actionType="category"
                isEmpty={true}
              />
            </SwiperSlide>
          </Swiper>
        </Grid>

        {/* Botão de adicionar nova Ação */}
        <Grid
          item
          sx={{
            display: "flex",
            justifyContent: "center",
            marginTop: "-2.5em",
            alignItems: "top",
          }}
        >
          <Fab
            size="large"
            sx={{ backgroundColor: theme.palette.secondary.main }}
            onClick={navigateToAddAction}
          >
            <Typography sx={{ fontSize: "2em", color: "#fff" }}>+</Typography>
          </Fab>
        </Grid>
      </Grid>
    </Box>
  );
};

const styles = {
  iconButton: {
    height: "2.5em",
    width: "2.5em",
  },
};

export default Home;
