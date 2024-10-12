import ForumRoundedIcon from "@mui/icons-material/ForumRounded";
import { Box, Button, FormControl, FormControlLabel, Radio, RadioGroup, TextField, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import React, { useState } from 'react';
import { departments } from './Recrutement/jei-departments';

const KanbanForm = ({ getFormData }) => {
    const theme = useTheme();

    const [formData, setFormData] = useState({
        interviewWith: '',
        interviewedBy: '',
        department: departments.PROJET.title,
        date: '',
        time: ''
    });

    const [errors, setErrors] = useState({});
    const [showDateTime, setShowDateTime] = useState(false);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = () => {
        if (validateForm()) {
            getFormData(formData);
        }
    };

    const toggleDateTimeFields = () => {
        setShowDateTime(prev => !prev);
    };

    const validateForm = () => {
        const newErrors = {};

        // Utility function to check for invalid characters
        const hasInvalidCharacters = (value) => /[^a-zA-Z\s\-\'èéàâôîû]/.test(value);


        if (!formData.interviewWith.trim()) {
            newErrors.interviewWith = "The interviewee's name is required.";
        } else if (hasInvalidCharacters(formData.interviewWith)) {
            newErrors.interviewWith = "The interviewee's name contains invalid characters.";
        } else if (formData.interviewWith.length < 3) {
            newErrors.interviewWith = "The interviewee's name is too short";
        } else if (formData.interviewWith.length > 20) {
            newErrors.interviewWith = "The interviewee's name is too long.";
        }


        if (!formData.interviewedBy.trim()) {
            newErrors.interviewedBy = "The interviewer's name is required.";
        } else if (hasInvalidCharacters(formData.interviewedBy)) {
            newErrors.interviewedBy = "The interviewer's name contains invalid characters.";
        } else if (formData.interviewedBy.length < 3) {
            newErrors.interviewedBy = "The interviewer's name is too short.";
        } else if (formData.interviewedBy.length > 20) {
            newErrors.interviewedBy = "The interviewer's name is too long.";
        }

        if (!formData.date)
        {
            newErrors.date="Date is required";
        }
        if(!formData.time)
        {
            newErrors.time="Time is required";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const renderTextField = (label, name, placeholder, type = 'text') => (
        <Box sx={{ height: '28px', display: 'flex', flexDirection: 'row', gap: '6px' }}>

            <Typography
                variant="body2"
                sx={{
                    fontFamily: theme.typography.fontFamily,
                    fontSize: '11px',
                    fontWeight: theme.typography.regular,
                    color: theme.palette.neutral.normal
                }}
            >
                {label}
            </Typography>
            <TextField
                name={name}
                value={formData[name]}
                onChange={handleChange}
                placeholder={placeholder}
                type={type}
                error={!!errors[name]}
                helperText={errors[name]}
                sx={{
                    width: '100%',
                    '& .MuiInputBase-root': { height: '100%' },
                    '& .MuiInputBase-input': { fontFamily: theme.typography.fontFamily, fontSize: '10px' },
                    '& .MuiFormHelperText-root': {
                        fontSize: '8px',  
                        color: 'red',
                        margin: 0,  
                    },
                    marginBottom:1,
                    '& input:-webkit-autofill': {
                        WebkitBoxShadow: '0 0 0 1000px white inset',
                        WebkitTextFillColor: 'black',
                        fontFamily: theme.typography.fontFamily,
                        transition: 'background-color 5000s ease-in-out 0s',
                        color: theme.palette.warning.text,
                        margin: 0,  
                    },
                }}
                
            />
            
        </Box>
    );

    return (
        <Box
            border={1}
            borderRadius={2}
            borderColor={theme.palette.neutral.light}
            p={1}
            mb={1}
        >
            <Box>
                <Box display="flex" flexDirection="row" alignItems="left">
                    <ForumRoundedIcon
                        sx={{
                            color: theme.palette.neutral.normal,
                            width: 12,
                            height: 12,
                        }}
                    />
                    <Typography fontSize={11} color={theme.palette.neutral.normal} ml={0.5} mb={1.5}>
                        Recruitment interview
                    </Typography>
                </Box>
                <Box mb={1}>
                    {renderTextField('Interview with', 'interviewWith', "Enter name")}
                </Box>

                <Typography
                    sx={{
                        fontFamily: theme.typography.fontFamily,
                        fontSize: 11,
                        color: theme.palette.neutral.normal,
                        marginBottom: 1.5,
                        cursor: 'pointer'
                    }}
                    onClick={toggleDateTimeFields}
                >
                    + Add date & time
                </Typography>

                {showDateTime && (
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mb: 1 }}>
                        {renderTextField('Date', 'date', '', 'date')}
                        {renderTextField('Time', 'time', '', 'time')}
                    </Box>
                )}

                <Box width={243} mb={1}>
                    {renderTextField('Will be interviewed by', 'interviewedBy', "Enter name")}
                </Box>
            </Box>

            <Box
                sx={{
                    width: '216px',
                    height: '102px',
                    gap: '8px',
                    paddingTop: '10px',
                    marginTop:2
                }}
            >
                <FormControl component="fieldset">
                    <Typography
                        variant="subtitle1"
                        sx={{
                            fontFamily: theme.typography.fontFamily,
                            fontSize: '11px',
                            fontWeight: theme.typography.regular,
                            lineHeight: '12.1px',
                            textAlign: 'left',
                            marginBottom: 1
                        }}
                    >
                        Choose department
                    </Typography>
                    <RadioGroup
                        aria-label="department"
                        name="department"
                        value={formData.department}
                        onChange={handleChange}
                        sx={{ display: 'flex', flexDirection: 'row', gap: '4px', marginLeft: '10px', marginTop: '5px' }}
                    >
                        {Object.values(departments).map(
                            (dept) => (
                                <FormControlLabel
                                    key={dept.id}
                                    value={dept.title}
                                    sx={{
                                        border: 1,
                                        borderColor: theme.palette.neutral.light,
                                        borderRadius: 2,
                                        padding: '2px 6px'
                                    }}
                                    control={
                                        <Radio
                                            sx={{
                                                height: 20,
                                                width: 20,
                                                borderColor: theme.palette.neutral,
                                                borderWidth: 1,
                                                '& .MuiSvgIcon-root': { fontSize: '16px' },
                                                color: theme.palette.neutral,
                                                '&.Mui-checked': {
                                                    color: "#6A7177",
                                                },
                                            }}
                                        />
                                    }
                                    label={
                                        <Typography
                                            sx={{
                                                fontFamily: theme.typography.fontFamily,
                                                fontSize: '9px',
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
                        width: '235px',
                        height: '24px',
                        padding: '6px 6px',
                        gap: '8px',
                        color: theme.palette.white.main,
                        borderRadius: '4px',
                        border: `1px solid ${theme.palette.neutral}`,
                        backgroundColor: '#404951',
                        textAlign: 'center',
                        fontSize: '10px',
                        marginTop: '30px',
                        marginLeft: '5px',
                        marginRight: '5px',
                        fontFamily: theme.typography.fontFamily,
                        '&:hover': {
                            backgroundColor: '#404951',
                            color: theme.palette.white.main,
                        },
                        '&:active': {
                            backgroundColor: '#404951',
                            color: theme.palette.white.main,
                        },
                        '&:focus': {
                            backgroundColor: '#404951',
                            color: theme.palette.white.main,
                        },
                    }}
                >
                    Confirm
                </Button>
            </Box>
        </Box>
    );
};

export default KanbanForm;
