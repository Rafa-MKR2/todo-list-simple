import { Button, Paper, TextField } from "@mui/material";
import React, { useState } from "react";

const Form = ({ addTodo }) => {
  const [text, setText] = useState("");

  const handleChange = (e) => {
    setText(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim()) {
      addTodo({
        id: new Date().getTime().toString(),
        text: text,
        completed: false,
      });
      setText("");
    }
  };

  return (
    <Paper elevation={3} style={{ padding: "1em" }}>
      <form onSubmit={handleSubmit} style={{ display: "flex", alignItems: "center" }}>
        <TextField
          label="Adicionar Tarefa"
          variant="outlined"
          fullWidth
          value={text}
          onChange={handleChange}
          style={{ marginRight: "1em" }}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={!text.trim()}
        >
          Adicionar
        </Button>
      </form>
    </Paper>
  );
};

export default Form;
