import { Box, TextField, Typography, useTheme } from '@mui/material';
import React, { useState } from 'react';
import ActionIcons from './ActionIcons'; // Import ActionIcons component

const Experience = () => {
  const theme = useTheme();
  const [questions, setQuestions] = useState([
    {
      label: '* Tell us about your social experience (clubs, associations, etc.)',
      placeholder: "Enter candidate's responses here",
      value: '',
      isEditing: false,
    },
    {
      label: '* Have you worked on any collaborative projects, and how did you contribute to the team?',
      placeholder: "Enter candidate's responses here",
      value: '',
      isEditing: false,
    },
  ]);

  // Handle input change
  const handleInputChange = (index, event) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].value = event.target.value;
    setQuestions(updatedQuestions);
  };

  // Handle adding a new question
  const handleAddQuestion = () => {
    setQuestions([
      ...questions,
      { label: '* New Question', placeholder: 'Enter candidate\'s response', value: '', isEditing: true },
    ]);
  };

  // Handle editing a question
  const handleEditQuestion = (index) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].isEditing = true;
    setQuestions(updatedQuestions);
  };

  // Handle saving an edited question
  const handleSaveQuestion = (index) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].isEditing = false;
    setQuestions(updatedQuestions);
  };

  // Handle deleting a question
  const handleDeleteQuestion = (index) => {
    const updatedQuestions = questions.filter((_, i) => i !== index);
    setQuestions(updatedQuestions);
  };

  return (
    <Box
      sx={{
        width: '827px',
        height: 'auto',
        padding: '10px',
        gap: '14px',
        display: 'flex',
        flexDirection: 'column',
        opacity: 1,
        border: `1px solid ${theme.palette.neutral[50]}`,
      }}
    >
      <Typography
        variant="h6"
        sx={{
          fontFamily: theme.typography.fontFamily,
          fontSize: '16px',
          fontWeight: 500,
          lineHeight: '19.36px',
          textAlign: 'left',
        }}
      >
        Experience
      </Typography>

      {/* Map through the questions */}
      {questions.map((question, index) => (
        <Box key={index} sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <TextField
            label={question.label}
            placeholder={question.placeholder}
            value={question.value}
            onChange={(e) => handleInputChange(index, e)}
            disabled={!question.isEditing} // Disable when not editing
            sx={{
              width: '100%',
              '& .MuiInputBase-input': {
                fontFamily: theme.typography.fontFamily,
                fontSize: '12px',
              },
            }}
          />

          {/* ActionIcons component for Add/Edit/Delete */}
          <ActionIcons
            isEditing={question.isEditing}
            onAdd={handleAddQuestion}
            onEdit={() => handleEditQuestion(index)}
            onDelete={() => handleDeleteQuestion(index)}
            onSave={() => handleSaveQuestion(index)}
          />
        </Box>
      ))}
    </Box>
  );
};

export default Experience;
