import React, { useState } from "react";
import {
  TextField,
  Box,
  Typography,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  useTheme,
} from "@mui/material";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import CircleIcon from '@mui/icons-material/Circle';

export default function DynamicSectionsForm({
  sections,
  addSection,
  modifySectionTitle,
  removeSection,
  addQuestion,
  handleQuestionChange,
  removeQuestion,
}) {
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openQuestionDialog, setOpenQuestionDialog] = useState(false);
  const [newSectionTitle, setNewSectionTitle] = useState("");
  const [editSectionIndex, setEditSectionIndex] = useState(null);
  const [newQuestion, setNewQuestion] = useState("");
  const [questionSectionIndex, setQuestionSectionIndex] = useState(null);
  const [editQuestionIndex, setEditQuestionIndex] = useState(null);
  const [error, setError] = useState("");

  const theme = useTheme();

  // Add Section handler
  const handleAddSection = () => {
    if (!newSectionTitle.trim()) {
      setError("Section title is required");
      return;
    }
    addSection(newSectionTitle);
    setNewSectionTitle("");
    setOpenAddDialog(false);
    setError("");
  };

  // Edit Section handler
  const handleEditSection = () => {
    if (!newSectionTitle.trim()) {
      setError("Section title is required");
      return;
    }
    modifySectionTitle(editSectionIndex, newSectionTitle);
    setNewSectionTitle("");
    setOpenEditDialog(false);
    setError("");
  };

  // Add or Edit Question handler
  const handleAddOrEditQuestion = () => {
    if (!newQuestion.trim()) {
      setError("Question is required");
      return;
    }

    if (editQuestionIndex !== null) {
      handleQuestionChange(
        questionSectionIndex,
        editQuestionIndex,
        "question",
        newQuestion
      );
    } else {
      addQuestion(questionSectionIndex, {
        question: newQuestion,
        response: "",
        id: null,
      });
    }
    setNewQuestion("");
    setEditQuestionIndex(null);
    setOpenQuestionDialog(false);
    setError("");
  };

  return (
    <>
      {sections.map((section, sectionIndex) => (
        <Box
          key={sectionIndex}
          sx={{ mt: 3, border: "2px solid", borderColor: theme.palette.neutral.light, padding: 2, borderRadius: 2 }}
        >
          <Box
            sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}
          >
            <Typography sx={{ fontSize: "18px", fontWeight: theme.typography.medium, mb: 2 }}>{section.title}</Typography>
            <Box>
              <IconButton
                title="Add"
                onClick={() => {
                  setQuestionSectionIndex(sectionIndex);
                  setOpenQuestionDialog(true);
                }}
              >
                <AddCircleOutlineIcon fontSize="small" />
              </IconButton>
              <IconButton
                title="Modify"
                onClick={() => {
                  setEditSectionIndex(sectionIndex);
                  setNewSectionTitle(section.title);
                  setOpenEditDialog(true);
                }}
              >
                <DriveFileRenameOutlineIcon fontSize="small" />
              </IconButton>
              <IconButton title="Delete" onClick={() => removeSection(sectionIndex)}>
                <DeleteOutlinedIcon fontSize="small" sx={{ color: "#E93544" }} />
              </IconButton>
            </Box>
          </Box>

          {/* Questions List */}
          {section.questions.map((question, questionIndex) => (
            <Box key={questionIndex} sx={{ minWidth: "94%" }}>
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <CircleIcon sx={{ fontSize: "10px" }} />
                  <Typography sx={{ fontSize: "15px", fontWeight: theme.typography.ragular }}>
                    {question.question}
                  </Typography>
                </Box>
                <Box>
                  <IconButton
                    title="Modify"
                    onClick={() => {
                      setQuestionSectionIndex(sectionIndex);
                      setNewQuestion(question.question);
                      setEditQuestionIndex(questionIndex);
                      setOpenQuestionDialog(true);
                    }}
                  >
                    <DriveFileRenameOutlineIcon fontSize="small" />
                  </IconButton>
                  <IconButton
                    title="Delete"
                    onClick={() => removeQuestion(sectionIndex, questionIndex)}
                  >
                    <DeleteOutlinedIcon fontSize="small" sx={{ color: "#E93544" }} />
                  </IconButton>
                </Box>
              </Box>
              <TextField
                hiddenLabel
                multiline
                rows={2}
                placeholder="Enter the candidate's response here"
                value={question.response}
                onChange={(e) =>
                  handleQuestionChange(
                    sectionIndex,
                    questionIndex,
                    "response",
                    e.target.value
                  )
                }
                onBlur={() => {
                  if (!question.response.trim()) {
                    handleQuestionChange(sectionIndex, questionIndex, "error", "Response is required");
                  } else {
                    handleQuestionChange(sectionIndex, questionIndex, "error", "");
                  }
                }}
                size="small"
                error={!!question.error}
                helperText={question.error ? question.error : ""}
                sx={{ width: "92%", mt: 1 }}
              />
              {error && <Typography color="error">{error}</Typography>}
            </Box>
          ))}
        </Box>
      ))}

      {/* Add Section Button */}
      <IconButton onClick={() => setOpenAddDialog(true)} sx={{ mt: 2 ,borderRadius:1.5}} size="small">
        <AddCircleOutlineIcon fontSize="small" sx={{ mr: 1 }} /> Add Section
      </IconButton>

      {/* Add Section Dialog */}
      <Dialog open={openAddDialog} onClose={() => setOpenAddDialog(false)}>
        <DialogTitle>Add Section</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Section Title"
            type="text"
            fullWidth
            value={newSectionTitle}
            onChange={(e) => setNewSectionTitle(e.target.value)}
          />
          {error && <Typography color="error">{error}</Typography>}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenAddDialog(false)}>Cancel</Button>
          <Button onClick={handleAddSection}>Add</Button>
        </DialogActions>
      </Dialog>

      {/* Edit Section Dialog */}
      <Dialog open={openEditDialog} onClose={() => setOpenEditDialog(false)}>
        <DialogTitle>Edit Section Title</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="New Section Title"
            type="text"
            fullWidth
            value={newSectionTitle}
            onChange={(e) => setNewSectionTitle(e.target.value)}
          />
          {error && <Typography color="error">{error}</Typography>}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEditDialog(false)}>Cancel</Button>
          <Button onClick={handleEditSection}>Save Changes</Button>
        </DialogActions>
      </Dialog>

      {/* Add/Edit Question Dialog */}
      <Dialog
        open={openQuestionDialog}
        onClose={() => {
          setNewQuestion("");
          setEditQuestionIndex(null);
          setOpenQuestionDialog(false);
        }}
      >
        <DialogTitle>
          {editQuestionIndex !== null ? "Edit Question" : "Add Question"}
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Question"
            type="text"
            fullWidth
            value={newQuestion}
            onChange={(e) => setNewQuestion(e.target.value)}
            onBlur={() => {
              if (!newQuestion.trim()) {
                setError("Question is required");
              } else {
                setError("");
              }
            }}
          />
          {error && <Typography color="error">{error}</Typography>}
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setNewQuestion("");
              setEditQuestionIndex(null);
              setOpenQuestionDialog(false);
            }}
          >
            Cancel
          </Button>
          <Button onClick={handleAddOrEditQuestion}>
            {editQuestionIndex !== null ? "Save Changes" : "Add"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
