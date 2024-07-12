import React from "react";
import { ToggleButton, ToggleButtonGroup, Paper } from "@mui/material";

const FilterSortPanel = ({ filter, setFilter, sort, setSort }) => {
  const handleFilterChange = (event, newFilter) => {
    if (newFilter !== null) {
      setFilter(newFilter);
    }
  };

  const handleSortChange = (event, newSort) => {
    if (newSort !== null) {
      setSort(newSort);
    }
  };

  return (
    <Paper style={{ padding: "1em" }}>
      <ToggleButtonGroup value={filter} exclusive onChange={handleFilterChange} aria-label="Filtrar por">
        <ToggleButton value="all" aria-label="Todas">
          Todas
        </ToggleButton>
        <ToggleButton value="completed" aria-label="Concluídas">
          Concluídas
        </ToggleButton>
        <ToggleButton value="pending" aria-label="Pendentes">
          Pendentes
        </ToggleButton>
      </ToggleButtonGroup>
      <ToggleButtonGroup value={sort} exclusive onChange={handleSortChange} aria-label="Ordenar por">
        <ToggleButton value="title" aria-label="Título">
          Título
        </ToggleButton>
        <ToggleButton value="date" aria-label="Data">
          Data
        </ToggleButton>
        <ToggleButton value="status" aria-label="Status">
          Status
        </ToggleButton>
      </ToggleButtonGroup>
    </Paper>
  );
};

export default FilterSortPanel;
