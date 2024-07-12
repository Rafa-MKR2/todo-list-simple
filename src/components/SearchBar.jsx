import React from "react";
import { TextField } from "@mui/material";

export default function SearchBar({ search, setSearch }) {
  return (
    <TextField
      fullWidth
      label="Pesquisar Tarefas"
      variant="outlined"
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      style={{ marginTop: "1em" }}
    />
  );
}
