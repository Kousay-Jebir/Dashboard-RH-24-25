import { Box, Button, FormControlLabel, Radio, RadioGroup, TextField, Typography, useTheme } from '@mui/material';
import React, { useState } from 'react';

const ScheduleInterview = () => {
    const [showDateTime, setShowDateTime] = useState(false);
    const [errors, setErrors] = useState({}); 

    const theme = useTheme();

    

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const toggleDateTimeFields = () => {
        setShowDateTime((prev) => !prev);
    };

    const renderTextField = (label, name, placeholder, type = 'text',multiline = false) => (
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
                value={formData[name]}
                onChange={handleChange}
                placeholder={placeholder}
                type={type}
                error={!!errors[name]}
                helperText={errors[name]}
                sx={{
                    width: '100%',
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
                </Box>

                <Box
                    sx={{
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '4px',
                        //padding: '16px',
                        marginBottom: 2,
                        marginTop:4
                    }}
                >
                    {renderTextField('Candidate', 'Candidate', 'Enter name')}
                   
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
                        value={formData.status}
                        onChange={handleChange}
                        sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            gap: '4px',
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
                        value={formData.department}
                        onChange={handleChange}
                        sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            gap: '4px',
                        }}
                    >
                        {['All members included', 'Executive Board Members', 'Quartet', 'Projet', 'Marketing', 'Dev.Commercial', 'Qualité'].map((privacy) => (
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
                            fontSize: 10,
                            color: '#404951',
                            border: '1px solid lightGrey',
                            borderRadius: 2,
                            marginRight: 0,
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
                            fontSize: 10,
                            backgroundColor: '#404951',
                            color: '#FFFFFF',
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

export default EditMeeting;
