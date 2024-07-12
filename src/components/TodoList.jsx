import React from "react";
import { List, Typography } from "@mui/material";
import TodoItem from "./TodoItem";

export default function TodoList({ todos, editTodo, deleteTodo }) {
  return (
    <List sx={{ marginTop: "1em" }}>
      {todos.length > 0 ? (
        <>
          <Typography variant="h5" gutterBottom>
            Minhas Tarefas
          </Typography>
          {todos.map((todo) => (
            <div key={todo.id} style={{ marginTop: "1em" }}>
              <TodoItem
                todo={todo}
                deleteTodo={deleteTodo}
                editTodo={(id, updatedTodo) => editTodo(id, updatedTodo)}
              />
            </div>
          ))}
        </>
      ) : (
        <Typography variant="body1">Não há tarefas para serem exibidas</Typography>
      )}
    </List>
  );
}
