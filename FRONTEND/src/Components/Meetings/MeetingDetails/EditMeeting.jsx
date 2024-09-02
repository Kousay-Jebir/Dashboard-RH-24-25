import {
    Box,
    Button,
    FormControlLabel,
    Radio,
    RadioGroup,
    TextField,
    Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import meetingData from './MeetingDetailsData.json';

const EditMeeting = () => {
    const [fetchedData, setFetchedData] = useState(null);

    useEffect(() => {
        setFetchedData(meetingData);
    }, []);

    if (!fetchedData) {
        return <p>Loading meeting details...</p>;
    }

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'flex-end',
                width: '100%',
                //padding: '16px'
            }}
        >
            <Box sx={{ width: 521 }}>
                <Box sx={{ height: 21, gap: 12 }}>
                    <Typography
                        variant="h5"
                        sx={{
                            fontFamily: 'Inter',
                            fontWeight: 700,
                            fontSize: 18,
                        }}
                    >
                        Edit Meeting
                    </Typography>
                </Box>

                <Box
                    sx={{
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '4px',
                        padding: '16px',
                        marginBottom: 2,
                    }}
                >
                    <TextField
                        label="Title"
                        defaultValue={fetchedData.Title}
                        fullWidth
                        sx={{
                            marginBottom: '4px',
                            '& .MuiInputLabel-root': {
                                fontSize: '12px',
                            },
                            '& .MuiInputBase-root': {
                                fontSize: '12px',
                            },
                        }}
                    />
                    <TextField
                        label="Date"
                        type="date"
                        defaultValue={fetchedData.Date}
                        fullWidth
                        sx={{
                            marginBottom: '4px',
                            '& .MuiInputLabel-root': {
                                fontSize: '12px',
                            },
                            '& .MuiInputBase-root': {
                                fontSize: '12px',
                            },
                        }}
                    />
                    <TextField
                        label="Time"
                        type="time"
                        defaultValue={fetchedData.Time}
                        fullWidth
                        sx={{
                            marginBottom: '4px',
                            '& .MuiInputLabel-root': {
                                fontSize: '12px',
                            },
                            '& .MuiInputBase-root': {
                                fontSize: '12px',
                            },
                        }}
                    />
                    <TextField
                        label="Place"
                        defaultValue={fetchedData.Place}
                        fullWidth
                        sx={{
                            marginBottom: '4px',
                            '& .MuiInputLabel-root': {
                                fontSize: '12px',
                            },
                            '& .MuiInputBase-root': {
                                fontSize: '12px',
                            },
                        }}
                    />
                    <TextField
                        label="Added by"
                        defaultValue={fetchedData.AddedBy}
                        fullWidth
                        sx={{
                            '& .MuiInputLabel-root': {
                                fontSize: '12px',
                            },
                            '& .MuiInputBase-root': {
                                fontSize: '12px',
                            },
                        }}
                    />
                </Box>

                <Box
                    sx={{
                        width: 521,
                        height:54,
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '4px',
                        padding: '16px',
                        marginBottom: 2,
                    }}
                >
                    <Typography variant="body2" sx={{ fontSize: '12px' }}>Change Status</Typography>
                    <RadioGroup
                        defaultValue={fetchedData.Status?.StatusText || 'Confirmed'}
                        sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            gap: '4px',
                            
                        }}
                    >
                        <FormControlLabel
                            value="Confirmed"
                            control={<Radio />}
                            label="Confirmed"
                            sx={{ fontSize: '12px' }}
                        />
                        <FormControlLabel
                            value="Delayed"
                            control={<Radio />}
                            label="Delayed"
                            sx={{ fontSize: '12px' }}
                        />
                        <FormControlLabel
                            value="Canceled"
                            control={<Radio />}
                            label="Canceled"
                            sx={{ fontSize: '12px' }}
                        />
                    </RadioGroup>
                </Box>

                <Box
                    sx={{
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '4px',
                        padding: '16px',
                        marginBottom: 2,
                    }}
                >
                    <Typography variant="body2" sx={{ fontSize: '14px' }}>Change Privacy</Typography>
                    <RadioGroup
                        defaultValue={fetchedData.Department}
                        sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            gap: '4px',
                        }}
                    >
                        <FormControlLabel
                            value="All members included"
                            control={<Radio />}
                            label="All members included"
                            sx={{ fontSize: '12px' }}
                        />
                        <FormControlLabel
                            value="Executive Board Members"
                            control={<Radio />}
                            label="Executive Board Members"
                            sx={{ fontSize: '12px' }}
                        />
                        <FormControlLabel
                            value="Quartet"
                            control={<Radio />}
                            label="Quartet"
                            sx={{ fontSize: '12px' }}
                        />
                        <FormControlLabel
                            value="Projet"
                            control={<Radio />}
                            label="Projet"
                            sx={{ fontSize: '12px' }}
                        />
                        <FormControlLabel
                            value="Marketing"
                            control={<Radio />}
                            label="Marketing"
                            sx={{ fontSize: '12px' }}
                        />
                        <FormControlLabel
                            value="Dev.Commercial"
                            control={<Radio />}
                            label="Dev.Commercial"
                            sx={{ fontSize: '12px' }}
                        />
                        <FormControlLabel
                            value="Qualité"
                            control={<Radio />}
                            label="Qualité"
                            sx={{ fontSize: '12px' }}
                        />
                    </RadioGroup>
                </Box>

                <Box sx={{ display: 'flex', gap: 1, marginTop: 2 }}>
                    <Button
                        variant="outlined"
                        sx={{
                            width: 195,
                            height: 46,
                            fontSize: 10,
                            color: '#404951',
                            border: '1px solid lightGrey',
                            borderRadius: 2,
                            marginRight: 1,
                            fontFamily: 'Inter',
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
                        Discard
                    </Button>

                    <Button
                        sx={{
                            width: 280,
                            height: 46,
                            fontSize: 10,
                            backgroundColor: '#404951',
                            color: '#FFFFFF',
                            border: '1px solid lightGrey',
                            borderRadius: 2,
                            fontFamily: 'Inter',
                            '&:hover': {
                                backgroundColor: '#404951',
                                borderColor: 'lightGrey',
                            },
                            '&:active': {
                                backgroundColor: '#404951',
                                borderColor: 'lightGrey',
                            },
                        }}
                    >
                        Save Changes
                    </Button>
                </Box>
            </Box>
        </Box>
    );
};

export default EditMeeting;
