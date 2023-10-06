import React, { useState, useEffect } from "react";
import {
  Container,
  Paper,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  Grid,
} from "@mui/material";

function Note() {
  const [name, setName] = useState("");
  const [content, setContent] = useState("");
  const [notes, setNotes] = useState([]);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editedName, setEditedName] = useState("");
  const [editedContent, setEditedContent] = useState("");
  const [editingNoteId, setEditingNoteId] = useState(null);

  const maxChars = 500;

  const handleChange = (e) => {
    const inputValue = e.target.value;
    if (inputValue.length <= maxChars) {
      setContent(inputValue);
    }
  };

  //Functionality for adding a note.
  const handleClick = (e) => {
    e.preventDefault();
    const note = { name, content };
    console.log(note);

    fetch("http://localhost:8080/note/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(note),
    })
      .then(() => {
        console.log("New Note added");
        fetch("http://localhost:8080/note/getAll")
          .then((res) => res.json())
          .then((result) => {
            setNotes(result);
          });
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  //Functionality for opening the edit dialog box.
  const openEditDialog = (noteId) => {
    const noteToEdit = notes.find((note) => note.id === noteId);
    if (noteToEdit) {
      setEditedName(noteToEdit.name);
      setEditedContent(noteToEdit.content);
      setEditingNoteId(noteId);
      setEditDialogOpen(true);
    }
  };

  //Functionality for deleting a note.
  const deleteNote = (noteId) => {
    fetch(`http://localhost:8080/note/delete/${noteId}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        if (response.ok) {
          console.log("Note deleted successfully");
          setNotes((prevNotes) =>
            prevNotes.filter((note) => note.id !== noteId)
          );
        } else {
          console.error("Failed to delete note");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  //Functionality for displaying all notes.
  useEffect(() => {
    fetch("http://localhost:8080/note/getAll")
      .then((res) => res.json())
      .then((result) => {
        setNotes(result);
      });
  }, []);

  //Functionality for submiting on the dialogue box.
  const handleEditSubmit = () => {
    const updatedNote = {
      id: editingNoteId,
      name: editedName,
      content: editedContent,
    };

    fetch(`http://localhost:8080/note/update/${editingNoteId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedNote),
    })
      .then(() => {
        console.log("Note updated successfully");
        setNotes((prevNotes) =>
          prevNotes.map((note) =>
            note.id === editingNoteId ? updatedNote : note
          )
        );
        setEditDialogOpen(false);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <Container sx={{ marginTop: "20px" }}>
      <Paper
        sx={{
          backgroundColor: "white",
          paddingRight: "3%",
          paddingLeft: "3%",
          boxShadow: "none",
        }}
        elevation={3}
      >
        <TextField
          label="Enter Note Title"
          variant="outlined"
          fullWidth
          margin="normal"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
        multiline
        rows={4}
        label="Enter Note Content"
        variant="outlined"
        fullWidth
        margin="normal"
        value={content}
        onChange={handleChange}
        error={content.length > maxChars}
        helperText={
          content.length > maxChars
            ? `Character limit exceeded (${content.length}/${maxChars})`
            : ''
        }
      />
        <Button onClick={(e) => handleClick(e)}>Submit</Button>
        <Box sx={{ marginTop: "2%", marginBottom: "2%" }}>
          Here are your notes!
        </Box>
        <Paper sx={{ boxShadow: "none" }}>
          {notes.map((note) => (
            <Paper
              style={{
                marginTop: "2%",
                marginBottom: "2%",
                margin: "1%",
                padding: "15px",
                textAlign: "left",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
              key={note.id}
            >
              <Box
                sx={{
                  maxWidth: "80%", // Set your desired maximum width
                  wordWrap: "break-word", // Allow long words to break and wrap
                }}
              >
                Name: {note.name}
                <br />
                Content: {note.content}
              </Box>

              <Box>
                <br />
                <Button onClick={() => openEditDialog(note.id)}>Edit</Button>
                <Button onClick={() => deleteNote(note.id)}>Delete</Button>
              </Box>
            </Paper>
          ))}
        </Paper>
      </Paper>
      <Dialog open={editDialogOpen} onClose={() => setEditDialogOpen(false)}>
        <DialogTitle>Edit Note</DialogTitle>
        <DialogContent>
          <TextField
            label="Edit Note Title"
            variant="outlined"
            fullWidth
            margin="normal"
            value={editedName}
            onChange={(e) => setEditedName(e.target.value)}
          />
          <TextField
            multiline
            rows={4}
            label="Edit Note Content"
            variant="outlined"
            fullWidth
            margin="normal"
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleEditSubmit}>Save</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default Note;
