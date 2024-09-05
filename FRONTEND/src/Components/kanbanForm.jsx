import ForumRoundedIcon from "@mui/icons-material/ForumRounded";
import { Box, Button, FormControl, FormControlLabel, Radio, RadioGroup, TextField, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import React, { useState } from 'react';
import { departments } from './Recrutement/jei-departments';

const KanbanForm = ({ getFormData }) => {
    const theme = useTheme();

    // State to manage form data
    const [formData, setFormData] = useState({
        interviewWith: '',
        interviewedBy: '',
        department: departments.PROJET.title,
        date: '',
        time: ''
    });

    // State to manage visibility of date and time input
    const [showDateTime, setShowDateTime] = useState(false);

    // Handler for input changes
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    // Handler for date change
    const handleDateChange = (date) => {
        setFormData((prevState) => ({
            ...prevState,
            date: date ? date.toISOString().split('T')[0] : ''
        }));
    };

    // Handler for time change
    const handleTimeChange = (time) => {
        setFormData((prevState) => ({
            ...prevState,
            time: time ? time.toISOString().split('T')[1].slice(0, 5) : ''
        }));
    };

    // Handler for showing and hiding date/time inputs
    const toggleDateTime = () => {
        setShowDateTime(prev => !prev);
    };

    // Handler for form submission
    const handleSubmit = () => {
        getFormData(formData);
    };

    const renderTextField = (label, name, placeholder) => (
        <Box sx={{ height: '20px', display: 'flex', flexDirection: 'row', gap: '6px' }}>
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
                sx={{
                    height: '20px',
                    width: "auto",
                    '& .MuiInputBase-root': { height: '100%' },
                    '& .MuiInputBase-input': { fontFamily: theme.typography.fontFamily, fontSize: '10px' },
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
                    <Typography fontSize={11} color={theme.palette.neutral.normal} ml={0.5} mb={1}>
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
                        marginBottom: 1,
                        cursor: 'pointer'
                    }}
                    onClick={toggleDateTime}
                >
                    + Add date & time
                </Typography>
                
               

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
