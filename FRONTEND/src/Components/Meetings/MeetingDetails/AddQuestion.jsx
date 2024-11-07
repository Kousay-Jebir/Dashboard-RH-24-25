import { useTheme } from '@emotion/react';
import AddIcon from '@mui/icons-material/Add';
import { Box, Button, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';

const AddQuestion = () => {
    const [question, setQuestion] = useState('');
    const [options, setOptions] = useState(['', '']);
    const [submitted, setSubmitted] = useState(false);
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

    const handleAddOption = () => {
        setOptions([...options, '']);
    };

    const handleOptionChange = (index, value) => {
        const newOptions = [...options];
        newOptions[index] = value;
        setOptions(newOptions);
    };

    const handleSubmit = () => {
        setSubmitted(true);
    };

    const handleAddNewQuestion = () => {
        setQuestion('');
        setOptions(['', '']);
        setSubmitted(false);
    };

    return (
        <Box>
            {submitted ? (
                // Display submitted question and options
                <Box>
                    <Typography variant="h6" sx={{ fontFamily: 'Inter', marginBottom: '8px' }}>
                        {question}
                    </Typography>
                    <ul>
                        {options.map((option, index) => (
                            <li key={index}>
                                <Typography sx={{ fontFamily: 'Inter', fontSize: '14px', color: theme.palette.text.secondary }}>
                                    {option}
                                </Typography>
                            </li>
                        ))}
                    </ul>
                    <Button
                        variant="outlined"
                        onClick={handleAddNewQuestion}
                        sx={{
                            borderRadius: 2,
                            textTransform: 'none',
                            fontFamily: theme.typography.fontFamily,
                            fontSize: 12,
                            color: 'text.secondary',
                            '&:hover': {
                                backgroundColor: 'transparent',
                                borderColor: 'lightGrey',
                            },
                        }}
                    >
                        Add New Question
                    </Button>
                </Box>
            ) : (
                // Form to add a new question and options
                <Box>
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
                            borderRadius: 2,
                            textTransform: 'none',
                            fontFamily: theme.typography.fontFamily,
                            fontSize: 12,
                            color: 'text.secondary',
                            marginBottom: 2,
                            '&:hover': {
                                backgroundColor: 'transparent',
                                borderColor: 'lightGrey',
                            },
                        }}
                    >
                        Add Option
                    </Button>

                    <Button
                        variant="outlined"
                        onClick={handleSubmit}
                        sx={{
                            borderRadius: 2,
                            textTransform: 'none',
                            fontFamily: theme.typography.fontFamily,
                            fontSize: 12,
                            color: 'text.secondary',
                            marginLeft: 2,
                            marginBottom: 2,
                            '&:hover': {
                                backgroundColor: 'transparent',
                                borderColor: 'lightGrey',
                            },
                        }}
                    >
                        Submit Question
                    </Button>
                </Box>
            )}
        </Box>
    );
};

export default AddQuestion;
