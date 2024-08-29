import { Box, Button, FormControl, FormControlLabel, Radio, RadioGroup, TextField, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import React, { useState } from 'react';
import { departments } from './Recrutement/jei-departments';

const KanbanForm = ({getFormData}) => {
    const theme = useTheme();

    // State to manage form data
    const [formData, setFormData] = useState({
        interviewWith: '',
        interviewedBy: '',
        department: departments.PROJET.title
    });

    // Handler for input changes
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    // Handler for form submission
    const handleSubmit = () => {
        getFormData(formData);
    };

    const renderTextField = (label, name, width, placeholder) => (
        <Box sx={{ width: '216px', height: '20px', display: 'flex', flexDirection: 'row', gap: '6px' }}>
            <Typography
                variant="body2"
                sx={{
                    fontFamily: theme.typography.fontFamily,
                    fontSize: '10px',
                    fontWeight: theme.typography.regular,
                    lineHeight: '12.1px',
                    textAlign: 'left',
                }}
            >
                {label}
            </Typography>
            <TextField
                name={name}
                value={formData[name]}
                onChange={handleChange}
                placeholder={placeholder}
                sx={{
                    height: '20px',
                    width: width,
                    '& .MuiInputBase-root': { height: '100%' },
                    '& .MuiInputBase-input': { fontFamily: theme.typography.fontFamily, fontSize: '10px' },
                }}
            />
        </Box>
    );

    return (
        <Box sx={{
            width: '236px',
            height: '260px',
            gap: '7px',
            border: '1px solid lightGrey',
            paddingLeft: '10px',
            paddingTop: '10px'
        }}>
            <Box
                sx={{
                    width: '216px',
                    height: '84px',
                    gap: '8px',
                    display: 'flex',
                    flexDirection: 'column'
                }}
            >
                <Typography
                    variant="h6"
                    sx={{
                        fontFamily: theme.typography.fontFamily,
                        fontSize: '10px',
                        fontWeight: theme.typography.regular,
                        lineHeight: '12.1px',
                        textAlign: 'left',
                    }}
                >
                    Recruitment Interview
                </Typography>

                <Box sx={{ display: 'flex', gap: '6px' }}>
                    {renderTextField('Interview with', 'interviewWith', 142, "Enter name")}
                </Box>
                <Box sx={{ display: 'flex', gap: '6px' }}>
                    {renderTextField('Will be interviewed by', 'interviewedBy', 108, "Enter name")}
                </Box>
            </Box>

            <Box
                sx={{
                    width: '216px',
                    height: '102px',
                    gap: '8px',
                    paddingTop: '10px'
                }}
            >
                <FormControl component="fieldset">
                    <Typography
                        variant="subtitle1"
                        sx={{
                            fontFamily: theme.typography.fontFamily,
                            fontSize: '10px',
                            fontWeight: theme.typography.regular,
                            lineHeight: '12.1px',
                            textAlign: 'left',
                        }}
                    >
                        Choose department
                    </Typography>
                    <RadioGroup
                        aria-label="department"
                        name="department"
                        value={formData.department}
                        onChange={handleChange}
                        sx={{ display: 'flex', flexDirection: 'row', gap: '10px', marginLeft: '10px', marginTop: '5px' }}
                    >
                        {Object.values(departments).map(
                            (dept) => (
                                <FormControlLabel
                                    key={dept.id}
                                    value={dept.title}
                                    control={
                                        <Radio
                                            sx={{
                                                width: '12px',
                                                height: '12px',
                                                marginRight: '4px'
                                            }}
                                        />
                                    }
                                    label={
                                        <Typography
                                            sx={{
                                                fontFamily: theme.typography.fontFamily,
                                                fontSize: '10px',
                                                fontWeight: theme.typography.regular,
                                                lineHeight: '12.1px',
                                                textAlign: 'left',
                                                gap: '5px'
                                            }}
                                        >
                                            {dept.title}
                                        </Typography>
                                    }
                                />
                            )
                        )}
                    </RadioGroup>
                </FormControl>
            </Box>

            <Box>
                <Button
                    onClick={handleSubmit}
                    sx={{
                        width: '216px',
                        height: '24px',
                        padding: '6px 6px 6px 6px',
                        gap: '8px',
                        color: 'white',
                        borderRadius: '4px',
                        border: `1px solid ${theme.palette.neutral}`,
                        backgroundColor: '#404951',
                        textAlign: 'center',
                        fontSize: '10px',
                        marginTop: '30px',
                    }}
                >
                    Confirm
                </Button>
            </Box>
        </Box>
    );
};

export default KanbanForm;
