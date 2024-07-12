import React, { useState } from "react";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { Paper, Dialog, DialogTitle, DialogContent, DialogActions, Button, DialogContentText } from "@mui/material"; // Adicione DialogContentText aqui
import EditTodoDialog from "./EditTodoDialog";

export default function TodoItem({ todo, deleteTodo, editTodo }) {
  const [openDialog, setOpenDialog] = useState(false);
  const [openConfirmModal, setOpenConfirmModal] = useState(false);

  const handleDialogOpen = () => {
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  const handleConfirmModalOpen = () => {
    setOpenConfirmModal(true);
  };

  const handleConfirmModalClose = () => {
    setOpenConfirmModal(false);
  };

  const handleDeleteConfirm = () => {
    deleteTodo(todo.id);
    handleConfirmModalClose();
  };

  return (
    <>
      <EditTodoDialog
        open={openDialog}
        dialogHandler={handleDialogClose}
        todo={todo}
        editTodo={editTodo}
      />
      <Paper style={{ padding: "0.5em 0em" }}>
        <ListItem
          secondaryAction={
            <React.Fragment>
              <IconButton edge="end" aria-label="delete" onClick={handleConfirmModalOpen}>
                <DeleteIcon />
              </IconButton>
              <Dialog open={openConfirmModal} onClose={handleConfirmModalClose}>
                <DialogTitle>Confirmação de Exclusão</DialogTitle>
                <DialogContent>
                  <DialogContentText>
                    Tem certeza de que deseja excluir esta tarefa?
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleConfirmModalClose} color="primary">
                    Cancelar
                  </Button>
                  <Button onClick={handleDeleteConfirm} color="primary" autoFocus>
                    Excluir
                  </Button>
                </DialogActions>
              </Dialog>
            </React.Fragment>
          }
          disablePadding
        >
          <ListItemButton role={undefined} dense>
            <ListItemIcon>
              <Checkbox
                edge="start"
                checked={todo.completed}
                tabIndex={-1}
                disableRipple
                onChange={() => editTodo(todo.id, { completed: !todo.completed })}
              />
            </ListItemIcon>
            <ListItemText
              primary={todo.text}
              onClick={handleDialogOpen} // Abrir o diálogo apenas ao clicar no texto da tarefa
            />
          </ListItemButton>
        </ListItem>
      </Paper>
    </>
  );
}
