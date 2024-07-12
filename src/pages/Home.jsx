import React, { useState, useEffect } from "react";
import { Container, Grid, Button, Dialog, DialogTitle, DialogActions, DialogContent, DialogContentText, Paper } from "@mui/material";
import Form from "../components/Form";
import FilterSortPanel from "../components/FilterSortPanel";
import SearchBar from "../components/SearchBar";
import TodoList from "../components/TodoList";

const Home = () => {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState("all");
  const [sort, setSort] = useState("date");
  const [search, setSearch] = useState("");
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    const savedTodos = JSON.parse(localStorage.getItem("todos")) || [];
    setTodos(savedTodos);
  }, []);
  
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);
  
  const addTodo = (todo) => {
    setTodos([...todos, todo]);
  };

  const deleteTodo = (id) => {
    const filtered = todos.filter((todo) => todo.id !== id);
    setTodos(filtered);
  };

  const editTodo = (id, updatedTodo) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, ...updatedTodo } : todo
    );
    setTodos(updatedTodos);
  };
  
  const clearCompletedTodos = () => {
    setOpenDialog(true);
  };

  const handleConfirmClear = () => {
    const filtered = todos.filter((todo) => !todo.completed);
    setTodos(filtered);
    setOpenDialog(false);
  };

  const handleCancelClear = () => {
    setOpenDialog(false);
  };

  const filteredTodos = todos
    .filter((todo) => {
      if (filter === "completed") return todo.completed;
      if (filter === "pending") return !todo.completed;
      return true;
    })
    .filter((todo) => todo.text.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      if (sort === "title") return a.text.localeCompare(b.text);
      if (sort === "date") return new Date(a.date) - new Date(b.date);
      if (sort === "status") return a.completed - b.completed;
      return 0;
    });

  return (
    <Container maxWidth="lg" style={{ marginTop: "2em" }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper style={{ padding: "1em", marginBottom: "1em" }}>
            <Form addTodo={addTodo} />
          </Paper>
          <Paper style={{ padding: "1em", marginBottom: "1em" }}>
            <FilterSortPanel filter={filter} setFilter={setFilter} sort={sort} setSort={setSort} />
            <SearchBar search={search} setSearch={setSearch} />
          </Paper>
          <Button
            fullWidth
            variant="outlined" // Altere para "outlined" para um estilo mais discreto
            color="secondary"
            onClick={clearCompletedTodos}
            style={{ marginBottom: "1em" }}
          >
            Limpar Tarefas Concluídas
          </Button>
          <Dialog open={openDialog} onClose={handleCancelClear}>
            <Button
            fullWidth
            variant="contained"
            color="primary"  // Alterado para primary para usar a cor azul padrão do Material-UI
            onClick={clearCompletedTodos}
            style={{ marginBottom: "1em" }}
              >
            Limpar Tarefas Concluídas
          </Button>            
          <DialogContent>
              <DialogContentText>
                Tem certeza de que deseja limpar todas as tarefas concluídas?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCancelClear} color="primary">
                Cancelar
              </Button>
              <Button onClick={handleConfirmClear} color="primary" variant="contained">
                Confirmar
              </Button>
            </DialogActions>
          </Dialog>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper style={{ padding: "1em" }}>
            <TodoList todos={filteredTodos} editTodo={editTodo} deleteTodo={deleteTodo} />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Home;
