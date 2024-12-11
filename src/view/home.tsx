import { useTheme } from "@mui/material/styles";
import { Grid, Avatar, Box, Typography } from "../components";
import Logo from "../img/logo.png";
import { Settings, List } from "@mui/icons-material"; // Importando os ícones

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../Context";
import { CardNewItem } from "../components";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { ACTIONS } from "../constants/actions.js";

import FormularioCategoria from "../view/forms";
import { IconButton, Modal, Button, Fab } from "@mui/material";

const Home: React.FC = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const { translate } = useAppContext(); // Ajeitar de acordo com o contexto

  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const navigateToSettings = () => {
    navigate("/settings"); // Navegar para a página de settings
  };

  const navigateToList = () => {
    // A navegação para o List será implementada futuramente
  };

  const navigateToAddAction = () => {
    navigate("/add-action");
  };

  const handleClick = () => {
    console.log("Fab clicado"); // Para debug
    onFabClick();
  };
  

  return (
    <Box
      sx={{
        height: "100vh",
        padding: "2em",
        display: "flex",
        justifyContent: "center",
        background: `linear-gradient(to bottom, transparent 10%, #3b79f5 70%)`,
        position: "relative",
      }}
    >
      <Grid
        container
        direction="column"
        spacing={4}
        alignItems="center"
        sx={{ maxWidth: "600px", width: "100%" }}
      >
        {/* Container para logo e ícones */}
        <Grid
          item
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            position: "relative",
            padding: "0 20px",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <IconButton
              onClick={navigateToSettings}
              sx={{
                color: "#b0bec5",
                fontSize: "60px",
                borderRadius: "50%",
                border: `2px solid black`,
              }}
            >
              <Settings sx={{ fontSize: "inherit" }} />
            </IconButton>
          </Box>

          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Avatar
              alt="Logo"
              src={Logo}
              sx={{
                width: 120,
                height: 120,
                borderRadius: "50%",
                border: `5px solid ${theme.palette.primary.main}`,
              }}
            />
          </Box>

          <Box sx={{ display: "flex", alignItems: "center" }}>
            <IconButton
              onClick={navigateToList}
              sx={{
                color: "#b0bec5",
                fontSize: "60px",
                borderRadius: "50%",
                border: `2px solid black`,
              }}
            >
              <List sx={{ fontSize: "inherit" }} />
            </IconButton>
          </Box>
        </Grid>

        <Typography sx={{ color: theme.palette.primary.main }}>
          Aplicativo gerenciador de compras
        </Typography>

        {/* Carrossel de ACTIONS */}
        <Grid
          item
          container
          spacing={1}
          sx={{
            overflow: "hidden",
            width: "100%",
            border: `2px solid ${theme.palette.primary.main}`,
            borderRadius: "8px",
            padding: "10px",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Swiper
            spaceBetween={0}
            slidesPerView="3"
            loop={true}
            centeredSlides={true}
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

            <SwiperSlide>
              <CardNewItem
                title="Adicionar Categoria"
                Icon={null}
                color={theme.palette.primary.main}
                actionType="category"
                isEmpty={true}
                onFabClick={handleOpenModal}
              />
            </SwiperSlide>
          </Swiper>
        </Grid>

        {/* Modal */}
        <Modal
          open={openModal}
          onClose={handleCloseModal}
          aria-labelledby="modal-title"
          aria-describedby="modal-description"
        >
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 400,
              bgcolor: "background.paper",
              boxShadow: 24,
              p: 4,
              borderRadius: 2,
            }}
          >
            <Typography id="modal-title" variant="h6" sx={{ marginBottom: "1em" }}>
              Adicionar Nova Categoria
            </Typography>
            <FormularioCategoria />
            <Button onClick={handleCloseModal} color="primary" sx={{ mt: 2 }}>
              Cancelar
            </Button>
          </Box>
        </Modal>

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

export default Home;
