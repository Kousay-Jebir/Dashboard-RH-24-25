import {
    Close as CloseIcon,
} from '@mui/icons-material';
import { Box, Button, FormControlLabel, IconButton, Radio, RadioGroup, TextField, Tooltip, Typography, useTheme } from '@mui/material';
import React, { useState } from 'react';
    const ScheduleInterview = () => {
    const [showDateTime, setShowDateTime] = useState(false);
    const [errors, setErrors] = useState({}); 
    const [isVisible, setIsVisible] = useState(true);

    const theme = useTheme();

    const handleToggle = () => {
        setIsVisible(!isVisible);
    };

    if (!isVisible) return null;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const toggleDateTimeFields = () => {
        setShowDateTime((prev) => !prev);
    };

    const renderTextField = (label, name, placeholder, type = 'text',multiline = false,width) => (
        <Box sx={{ height: '30px', display: 'flex', flexDirection: 'row', gap: '10px' }}>
            <Typography
                variant="body2"
                sx={{
                    fontFamily: theme.typography.fontFamily,
                    fontSize: '13px',
                    fontWeight: theme.typography.regular,
                    color: theme.palette.neutral.normal,
                }}
            >
                {label}
            </Typography>
            <TextField
                name={name}
                onChange={handleChange}
                placeholder={placeholder}
                type={type}
                error={!!errors[name]}
                helperText={errors[name]}
                sx={{
                    width: {width},
                    '& .MuiInputBase-root': { height: '100%' },
                    '& .MuiInputBase-input': { fontFamily: theme.typography.fontFamily, fontSize: '14px' },
                    '& .MuiFormHelperText-root': {
                        fontSize: '12px',
                        color: theme.palette.warning.text,
                        margin: 0,
                    },
                    '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                        borderColor: theme.palette.neutral.light, 
                    },},
                }}
                
            />
        </Box>
    );

   

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'flex-end',
                width: '100%',
            }}
        >
            <Box sx={{ width: 521 }}>
                <Box sx={{ height: 21, gap: 12 }}>
                    <Typography
                        variant="h5"
                        sx={{
                            fontFamily: theme.typography.fontFamily,
                            fontWeight: 700,
                            fontSize: 18,
                            marginBottom:2,
                            marginTop:3
                            
                        }}
                    >
                        Schedule an interview for later
                    </Typography>
                    <Tooltip title="Close">
                        <IconButton
                            onClick={handleToggle}
                            sx={{
                                position: 'absolute',
                                top: 10,
                                right: 10,
                                zIndex: 1,
                                color: theme.palette.grey[600],
                            }}
                        >
                            <CloseIcon />
                        </IconButton>
                    </Tooltip>
                </Box>

                <Box
                    sx={{
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        flexWrap:'wrap',
                        gap: '4px',
                        //padding: '16px',
                        marginBottom: 2,
                        marginTop:4
                    }}
                >
                    {renderTextField('Candidate', 'Candidate', 'Enter name')}
                    {renderTextField('Phone', 'Phone', '+ 216')}
                    {renderTextField('City', 'City', 'Enter city')}
                    {renderTextField('Adress', 'Adress', ' Enter adress')}


                    <Typography
                        sx={{
                            fontFamily: theme.typography.fontFamily,
                            fontSize: 14,
                            color: theme.palette.neutral.normal,
                            marginBottom: 1,
                            cursor: 'pointer',
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

                    {renderTextField('Recruiter', 'Recruiter', 'Enter name')}
                    {renderTextField('E-mail adress', 'e-mail', 'Enter e-mail adress')}
                </Box>

                <Box
                    sx={{
                        width: 521,
                        height: 54,
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '4px',
                        //padding: '16px',
                        marginBottom: 2,
                        marginTop:6,
                    }}
                >
                    <Typography variant="body2" sx={{ fontSize: '13px' }}>Change Status</Typography>
                    <RadioGroup
                        name="status"
                        onChange={handleChange}
                        sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            gap: '4px',
                            marginLeft:"10px"

                        }}
                    >
                        {['Confirmed', 'Delayed', 'Canceled'].map((status) => (
                            <FormControlLabel
                                key={status}
                                value={status}
                                sx={{
                                    border: 1,
                                    borderColor: theme.palette.neutral.light,
                                    borderRadius: 2,
                                    padding: '2px 6px',
                                    fontSize: '12px',
                                }}
                                control={
                                    <Radio
                                        sx={{
                                            height: 20,
                                            width: 20,
                                            borderColor: theme.palette.neutral,
                                            '& .MuiSvgIcon-root': { fontSize: '12px' },
                                            color: theme.palette.neutral,
                                            '&.Mui-checked': { color: '#6A7177' },
                                        }}
                                    />
                                }
                                label={status}
                            />
                        ))}
                    </RadioGroup>
                </Box>

                <Box
                    sx={{
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '4px',
                        //padding: '16px',
                        marginBottom: 2,
                    }}
                >
                    <Typography variant="body2" sx={{ fontSize: '13px' }}>Change Privacy</Typography>
                    <RadioGroup
                        name="department"
                        onChange={handleChange}
                        sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            gap: '4px',
                            marginLeft:"10px"

                        }}
                    >
                        {['Projet', 'Marketing', 'Dev.Commercial', 'Qualité'].map((privacy) => (
                            <FormControlLabel
                                key={privacy}
                                value={privacy}
                                sx={{
                                    border: 1,
                                    borderColor: theme.palette.neutral.light,
                                    borderRadius: 2,
                                    padding: '2px 6px',
                                    fontSize: '12px',
                                }}
                                control={
                                    <Radio
                                        sx={{
                                            height: 20,
                                            width: 20,
                                            borderColor: theme.palette.neutral,
                                            '& .MuiSvgIcon-root': { fontSize: '12px' },
                                            color: theme.palette.neutral,
                                            '&.Mui-checked': { color: '#6A7177' },
                                        }}
                                    />
                                }
                                label={privacy}
                            />
                        ))}
                    </RadioGroup>
                </Box>

                <Box sx={{ display: 'flex', gap: 1, marginTop: 2 }}>
                    <Button
                        variant="outlined"
                        sx={{
                            width: '40%',
                            height: 46,
                            fontSize: 12,
                            color: '#404951',
                            border: '1px solid lightGrey',
                            borderRadius: 2,
                            marginRight: 0,
                            textTransform: "none",

                            fontFamily: 'Inter',
                            '&:hover': {
                                backgroundColor: 'transparent',
                                borderColor: 'lightGrey',
                            },
                        }}
                    >
                        Schedule
                    </Button>

                    <Button
                        sx={{
                            width: '60%',
                            height: 46,
                            fontSize: 12,
                            backgroundColor: '#404951',
                            color: '#FFFFFF',
                            textTransform: "none",

                            borderRadius: 2,
                            fontFamily: 'Inter',
                            '&:hover': {
                                backgroundColor: '#404951',
                            },
                        }}
                    >
                        Start interview
                    </Button>
                </Box>
            </Box>
        </Box>
    );
};

export default ScheduleInterview;
