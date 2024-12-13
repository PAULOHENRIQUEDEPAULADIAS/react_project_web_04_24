import { useTheme } from "@mui/material/styles";
import { Grid, Avatar, Box, Typography } from "../components";
import Logo from "../img/logo.png";
import { Settings, List } from "@mui/icons-material"; // Importando os ícones

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
    navigate("/settings"); // Navegar para a página de settings
  };

  const navigateToAddAction = () => {
    navigate("/add-action");
  };

  const handleClick = () => {
    console.log("Fab clicado"); // Para debug
    onFabClick();
  };
  

  const handlePrint = () => {
    const printContents = document.getElementById("printable-area").innerHTML;
    const originalContents = document.body.innerHTML;
  
    // Temporariamente substitui o conteúdo do body
    document.body.innerHTML = printContents;
  
    // Aciona a impressão
    window.print();
  
    // Restaura o conteúdo original
    document.body.innerHTML = originalContents;
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
            {/* Aqui, o ícone de lista será utilizado para abrir a lista de compras */}
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
                handleClick={handleOpenModal}
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

        <div id="printable-area">
  <ShoppingList />
</div>

      </Grid>
    </Box>
  );
};

export default Home;

<style>
  {`
    @media print {
      /* Oculta tudo fora do print-area */
      body > * {
        display: none !important;
      }

      /* Mostra apenas o conteúdo a ser impresso */
      #printable-area {
        display: block !important;
        width: 100%;
        padding: 20px;
        margin: 0 auto;
        font-family: Arial, sans-serif;
        box-sizing: border-box;
      }

      /* Estilo para os itens na lista */
      #printable-area .shopping-item {
        display: flex;
        flex-direction: column;
        margin-bottom: 20px;
        padding: 10px;
        border: 1px solid #ccc;
        border-radius: 8px;
        background-color: #f9f9f9;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      }

      /* Ajusta o espaçamento entre os itens */
      #printable-area .shopping-item + .shopping-item {
        margin-top: 10px;
      }

      /* Ajuste de texto e outros elementos */
      #printable-area .shopping-item h3 {
        margin: 0;
        font-size: 16px;
        font-weight: bold;
      }

      #printable-area .shopping-item p {
        margin: 5px 0 0;
        font-size: 14px;
      }
    }
  `}
</style>
