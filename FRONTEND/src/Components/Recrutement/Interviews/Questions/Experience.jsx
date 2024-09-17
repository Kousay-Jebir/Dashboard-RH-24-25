import { Box, Button, TextField, Typography, useTheme } from '@mui/material';
import React, { useState } from 'react';
import ActionIcons from './ActionIcons'; // Import ActionIcons component

const renderTextField = ({ label, placeholder, height, fontSize, value, onChange, disabled }) => {
  const theme = useTheme();
  
  return (
    <Box
      sx={{
        width: '791px',
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
      }}
    >
      <Typography
        variant="body2"
        sx={{
          fontFamily: theme.typography.fontFamily,
          fontSize: '14px',
          fontWeight: theme.typography.fontWeightRegular,
          textAlign: 'left',
        }}
      >
        {label}
      </Typography>
      <TextField
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        sx={{
          height: height || '31px',
          '& .MuiInputBase-root': { height: '100%' },
          '& .MuiInputBase-input': {
            fontFamily: theme.typography.fontFamily,
            fontSize: fontSize || '12px',
          },
          '& .MuiFormLabel-root': {
            fontFamily: theme.typography.fontFamily,
            fontSize: '14px',
            fontWeight: theme.typography.fontWeightRegular,
            textAlign: 'left',
          },
        }}
      />
    </Box>
  );
};

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

  const [newQuestion, setNewQuestion] = useState('');
  const [newResponse, setNewResponse] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);

  // Handle input change for question and response
  const handleInputChange = (index, event, field) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index][field] = event.target.value;
    setQuestions(updatedQuestions);
  };

  // Handle adding a new question
  const handleAddQuestion = () => {
    setIsAdding(true);
    setEditingIndex(null); // Ensure no question is being edited when adding
  };

  // Handle saving a new or edited question
  const handleSaveQuestion = () => {
    if (isAdding) {
      setQuestions([
        ...questions,
        {
          label: newQuestion,
          placeholder: 'Enter candidate\'s response here',
          value: newResponse,
          isEditing: false,
        },
      ]);
      setNewQuestion('');
      setNewResponse('');
      setIsAdding(false);
    } else if (editingIndex !== null) {
      const updatedQuestions = [...questions];
      updatedQuestions[editingIndex].label = newQuestion;
      updatedQuestions[editingIndex].value = newResponse;
      setQuestions(updatedQuestions);
      setNewQuestion('');
      setNewResponse('');
      setEditingIndex(null);
    }
  };

  // Handle canceling adding or editing a question
  const handleCancel = () => {
    setNewQuestion('');
    setNewResponse('');
    setEditingIndex(null);
    setIsAdding(false);
  };

  // Handle editing an existing question
  const handleEditQuestion = (index) => {
    setNewQuestion(questions[index].label);
    setNewResponse(questions[index].value);
    setEditingIndex(index);
    setIsAdding(false);
  };

  // Handle deleting a question
  const handleDeleteQuestion = (index) => {
    const updatedQuestions = questions.filter((_, i) => i !== index);
    setQuestions(updatedQuestions);
    setEditingIndex(null);
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
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
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

        {/* ActionIcons component for Add/Edit/Delete */}
        <ActionIcons
          isEditing={editingIndex !== null || isAdding}
          onAdd={handleAddQuestion}
          onEdit={() => editingIndex !== null && handleEditQuestion(editingIndex)}
          onDelete={() => editingIndex !== null && handleDeleteQuestion(editingIndex)}
          onSave={handleSaveQuestion}
          onCancel={handleCancel}
        />
      </Box>

      {/* Display existing questions */}
      {questions.map((question, index) => (
        <Box key={index} sx={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '10px' }}>
          {renderTextField({
            label: question.label,
            placeholder: question.placeholder,
            value: question.value,
            onChange: (e) => handleInputChange(index, e, 'value'),
            disabled: !(index === editingIndex || isAdding),
          })}
          {/* Render ActionIcons for the currently edited question */}
          {(index === editingIndex || isAdding) && (
            <ActionIcons
              isEditing={index === editingIndex}
              onAdd={handleAddQuestion}
              onEdit={() => handleEditQuestion(index)}
              onDelete={() => handleDeleteQuestion(index)}
              onSave={handleSaveQuestion}
              onCancel={handleCancel}
            />
          )}
        </Box>
      ))}

      {/* Show add form below the list of existing questions */}
      {(isAdding || editingIndex !== null) && (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {renderTextField({
            label: 'New Question',
            placeholder: 'Enter new question here',
            value: newQuestion,
            onChange: (e) => setNewQuestion(e.target.value),
          })}
          {renderTextField({
            label: 'Response',
            placeholder: 'Enter candidate\'s response here',
            value: newResponse,
            onChange: (e) => setNewResponse(e.target.value),
          })}
          <Box sx={{ display: 'flex', gap: '10px' }}>
            <Button onClick={handleSaveQuestion} variant="contained">Save</Button>
            <Button onClick={handleCancel} variant="outlined">Cancel</Button>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default Experience;
