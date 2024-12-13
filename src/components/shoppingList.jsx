import React, { useState } from "react";
import {
  Grid,
  Fab,
  Modal,
  Box,
  TextField,
  Button,
  Typography,
  Card,
  CardContent,
  IconButton,
  Checkbox,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import { ACTIONS } from "../constants/actions"; 
import { Delete as DeleteIcon } from "@mui/icons-material";

const ShoppingList = () => {
  const [openModal, setOpenModal] = useState(false); 
  const [selectedCategory, setSelectedCategory] = useState(null); 
  const [itemDescription, setItemDescription] = useState(""); 
  const [items, setItems] = useState([]); 

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedCategory(null);
    setItemDescription("");
  };

  const handleAddItem = () => {
    if (selectedCategory && itemDescription) {
      const newItem = {
        id: Date.now(),
        category: selectedCategory,
        description: itemDescription,
        checked: false,
      };
      setItems((prevItems) => [...prevItems, newItem]);
      handleCloseModal();
    }
  };

  const handleDeleteItem = (itemId) => {
    setItems(items.filter((item) => item.id !== itemId));
  };

  const handleCheckItem = (itemId) => {
    setItems(
      items.map((item) =>
        item.id === itemId ? { ...item, checked: !item.checked } : item
      )
    );
  };

  const getCategoryIcon = (category) => {
    const categoryObj = ACTIONS.find((action) => action.title === category);
    return categoryObj ? (
      <categoryObj.Icon sx={{ color: categoryObj.color }} />
    ) : null;
  };

  return (
    <>
 
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
          sx={{ backgroundColor: "#4caf50" }}
          onClick={handleOpenModal}
        >
          <Typography sx={{ fontSize: "2em", color: "#fff" }}>+</Typography>
        </Fab>
      </Grid>


      <Modal open={openModal} onClose={handleCloseModal}>
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
          <Typography variant="h6" sx={{ marginBottom: "1em" }}>
            Adicionar Novo Item
          </Typography>

          <FormControl fullWidth sx={{ marginBottom: "1em" }}>
            <InputLabel>Selecione a Categoria</InputLabel>
            <Select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              label="Selecione a Categoria"
            >
              {ACTIONS.map((action) => (
                <MenuItem key={action.actionType} value={action.title}>
                  {action.title}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            label="Descrição do Item"
            fullWidth
            value={itemDescription}
            onChange={(e) => setItemDescription(e.target.value)}
            sx={{ marginBottom: "1em" }}
          />

          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleAddItem}
          >
            Adicionar Item
          </Button>
        </Box>
      </Modal>


      {items.map((item) => (
        <Card
          key={item.id}
          sx={{ display: "flex", alignItems: "center", marginBottom: "1em" }}
        >
          <CardContent
            sx={{ display: "flex", alignItems: "center", width: "100%" }}
          >

            <IconButton sx={{ marginRight: "1em" }}>
              {getCategoryIcon(item.category)}
            </IconButton>

            <Typography
              sx={{
                flexGrow: 1,
                textDecoration: item.checked ? "line-through" : "none", // Adicionando risco
              }}
            >
              {item.description}
            </Typography>

            <IconButton onClick={() => handleCheckItem(item.id)}>
              <Checkbox checked={item.checked} />
            </IconButton>

            <IconButton onClick={() => handleDeleteItem(item.id)}>
              <DeleteIcon color="error" />
            </IconButton>
          </CardContent>
        </Card>
      ))}
    </>
  );
};

export default ShoppingList;
