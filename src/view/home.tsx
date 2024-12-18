import { useTheme } from "@mui/material/styles";
import { Grid, Avatar, Box, Typography } from "../components";
import Logo from "../img/logo.png";
import { Settings, List } from "@mui/icons-material";

import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context";
import { CardNewItem } from "../components";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { ACTIONS } from "../constants/actions.js";

import FormularioCategoria from "../view/forms";
import { IconButton, Modal, Button, Fab } from "@mui/material";

import ShoppingList from "../components/shoppingList.jsx";

const Home: React.FC = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  //const { translate } = useAppContext();

  const [openModal, setOpenModal] = useState(false);
  const [items, setItems] = useState([]);
  const componentRef = useRef();

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const navigateToSettings = () => {
    navigate("/settings");
  };

  const navigateToAddAction = () => {
    navigate("/add-action");
  };

  const handleClick = () => {
    console.log("Fab clicado");
    onFabClick();
  };

  const handlePrint = () => {
    const printContents = document.getElementById("printable-area").innerHTML;
    const originalContents = document.body.innerHTML;

    document.body.innerHTML = printContents;

    window.print();

    document.body.innerHTML = originalContents;
  };

  return (
    <Box
      sx={{
        height: "100vh",
        width: "100vw",
        padding: "2em",
        display: "flex",
        justifyContent: "center",
        backgroundColor: theme.palette.background.default,       
      }}
    >
      <Grid
        container
        direction="column"
        spacing={4}
        alignItems="center"
        sx={{ maxWidth: "600px", width: "100%" }}
      >
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
              onClick={handlePrint}
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
                handleClick={handleOpenModal}
              />
            </SwiperSlide>
          </Swiper>
        </Grid>

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
            <Typography
              id="modal-title"
              variant="h6"
              sx={{ marginBottom: "1em" }}
            >
              Adicionar Nova Categoria
            </Typography>
            <FormularioCategoria />
            <Button onClick={handleCloseModal} color="primary" sx={{ mt: 2 }}>
              Cancelar
            </Button>
          </Box>
        </Modal>

        <div id="printable-area" 
        sx={{
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
            padding: "0 20px",
          }}>
          <ShoppingList 
          
          />
        </div>
      </Grid>
    </Box>
  );
};

export default Home;
