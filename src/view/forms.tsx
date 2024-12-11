import React, { useState } from "react";
import { TextField, Button, Box } from "@mui/material";

const FormularioCategoria: React.FC = () => {
  const [categoria, setCategoria] = useState("");

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log("Categoria adicionada:", categoria);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box sx={{ display: "flex", flexDirection: "column", gap: "1em" }}>
        <TextField
          label="Nome da Categoria"
          variant="outlined"
          value={categoria}
          onChange={(e) => setCategoria(e.target.value)}
          required
        />
        <Button type="submit" variant="contained" color="primary">
          Adicionar
        </Button>
      </Box>
    </form>
  );
};

export default FormularioCategoria;