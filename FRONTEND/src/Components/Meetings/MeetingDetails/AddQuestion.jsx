import { useTheme } from '@emotion/react';
import AddIcon from '@mui/icons-material/Add';
import { Box, Button, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';

const AddQuestion = ({ onAddQuestion }) => {
    const [question, setQuestion] = useState('');
    const [options, setOptions] = useState(['','']);
    const theme = useTheme();

    const renderTextField = (label, value, onChange, placeholder, type = 'text', multiline = false) => (
        <Box sx={{ display: 'flex', flexDirection: 'column', marginBottom: '16px' }}>
            <Typography
                variant="body2"
                sx={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '14px',
                    fontWeight: 400,
                    color: theme.palette.text.primary,
                    marginBottom: '1px',
                }}
            >
                {label}
            </Typography>
            <TextField
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                type={type}
                multiline={multiline}
                rows={multiline ? 4 : 1}
                fullWidth
                sx={{
                    height: '31px',
                    '& .MuiInputBase-root': { height: '100%' },
                    '& .MuiInputBase-input': { fontFamily: 'Inter', fontSize: '14px' },
                    '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                            borderColor: '#ccc',
                        },
                        '&:hover fieldset': {
                            borderColor: '#aaa',
                        },
                        '&.Mui-focused fieldset': {
                            borderColor: '#888',
                        },
                    },
                }}
            />
        </Box>
    );

    // Add a new option to the list
    const handleAddOption = () => {
        setOptions([...options, '']);
    };

    // Update the value of a specific option
    const handleOptionChange = (index, value) => {
        const newOptions = [...options];
        newOptions[index] = value;
        setOptions(newOptions);
    };

    // Submit the question and reset the form
    const handleSubmit = () => {
        onAddQuestion({ question, options });
        setQuestion('');
        setOptions(['']);
    };

    return (
        <Box>
            {/* Render the question TextField */}
            {renderTextField(
                'Question',
                question,
                (e) => setQuestion(e.target.value),
                'Enter your question here'
            )}
            
            <Box sx={{ marginBottom: '16px' }}>
                <Typography
                    variant="body2"
                    sx={{
                        fontFamily: 'Inter',
                        fontSize: '14px',
                        fontWeight: 400,
                        color: theme.palette.text.primary,
                        marginBottom: '4px',
                    }}
                >
                    Answer options
                </Typography>
                {options.map((option, index) => (
                    renderTextField(
                        '',
                        option,
                        (e) => handleOptionChange(index, e.target.value),
                        'Enter an option'
                    )
                ))}
            </Box>

            <Button
                variant="outlined"
                startIcon={<AddIcon sx={{ fontSize: 9, height: 15, width: 15 }} />}
                onClick={handleAddOption}
                sx={{
                    border: 'none',
                    borderRadius: 2,
                    textTransform: 'none',
                    fontFamily: theme.typography.fontFamily,
                    fontSize: 12,
                    padding: '2px 6px',
                    color: 'text.secondary',
                    marginBottom: 2,
                    '&:hover': {
                        backgroundColor: 'transparent',
                        borderColor: 'lightGrey',
                    },
                    '&:active': {
                        backgroundColor: 'transparent',
                        borderColor: 'lightGrey',
                    },
                }}
            >
                Add Option
            </Button>

            {/* Button to submit the question */}
            <Button
                variant="outlined"
                onClick={handleSubmit}
                sx={{
                    border: 'none',
                    borderRadius: 2,
                    textTransform: 'none',
                    fontFamily: theme.typography.fontFamily,
                    fontSize: 12,
                    padding: '2px 6px',
                    color: 'text.secondary',
                    marginLeft: 5,
                    marginBottom: 2,
                    '&:hover': {
                        backgroundColor: 'transparent',
                        borderColor: 'lightGrey',
                    },
                    '&:active': {
                        backgroundColor: 'transparent',
                        borderColor: 'lightGrey',
                    },
                }}
            >
                Submit Question
            </Button>
        </Box>
    );
};

export default AddQuestion;