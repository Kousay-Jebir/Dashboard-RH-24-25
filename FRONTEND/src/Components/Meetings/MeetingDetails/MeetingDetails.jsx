import {
    AccessTime as AccessTimeIcon,
    CalendarToday as CalendarTodayIcon,
    Close as CloseIcon,
    LocationOn as LocationOnIcon,
    Person as PersonIcon
} from '@mui/icons-material';
import AddIcon from '@mui/icons-material/Add';
import { Box, Button, Card, CardContent, IconButton, Tooltip, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import React, { useEffect, useState } from 'react';
import AddQuestion from './AddQuestion';
import meetingData from './MeetingDetailsData.json';

const MeetingDetails = () => {
    const theme = useTheme();
    const [fetchedData, setFetchedData] = useState(null);
    const [isVisible, setIsVisible] = useState(true);
    const [questions, setQuestions] = useState([]);
    const [isAddQuestionVisible, setIsAddQuestionVisible] = useState(false);
    const [isButtonVisible, setIsButtonVisible] = useState(true);

    useEffect(() => {
        setFetchedData(meetingData);
    }, []);

    if (!fetchedData) {
        return <p>Loading meeting details...</p>;
    }

    const handleToggle = () => {
        setIsVisible(!isVisible);
    };

    if (!isVisible) return null;

    const handleAddQuestionToggle = () => {
        setIsAddQuestionVisible(true);
        setIsButtonVisible(false);
    };

    const handleQuestionSubmit = (newQuestion) => {
        setQuestions((prevQuestions) => [...prevQuestions, newQuestion]);
        setIsAddQuestionVisible(false);
        setIsButtonVisible(true); 
    };

    const StatusColor = fetchedData.Status?.StatusColor || 'defaultColor';

    return (
        <Box
            sx={{
                //gap: 34,
                display: 'flex',
                overflow:'auto',
                justifyContent: 'flex-end',
                fontFamily: theme.typography.fontFamily,
            }}
        >
            <Card>
                <CardContent >
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

                    <Box sx={{ width: 521, height: 21, gap: 12 }}>
                        <Typography
                            variant="h5"
                            sx={{
                                fontFamily: theme.typography.fontFamily,
                                fontWeight: theme.typography.fontWeightBold,
                                fontSize: 18,
                            }}
                        >
                            Meeting Details
                        </Typography>
                    </Box>

                    <Box sx={{ marginTop: 2, width: 521, height: 127, gap: 14 }}>
                        <Typography
                            variant="h5"
                            sx={{
                                fontFamily: theme.typography.fontFamily,
                                fontWeight: theme.typography.fontWeightBold,
                                fontSize: 18,
                            }}
                        >
                            {fetchedData.Title} {fetchedData.Ag || ''}
                        </Typography>

                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <AccessTimeIcon fontSize="small" />
                            <Typography variant="body2">{fetchedData.Time}</Typography>
                        </Box>

                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <CalendarTodayIcon fontSize="small" />
                            <Typography variant="body2">{fetchedData.Date}</Typography>
                        </Box>

                        {fetchedData.Place && (
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <LocationOnIcon fontSize="small" />
                                <Typography variant="body2">{fetchedData.Place}</Typography>
                            </Box>
                        )}

                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <PersonIcon fontSize="small" />
                            <Typography variant="body2">
                                added by {fetchedData.AddedBy}
                            </Typography>
                        </Box>
                    </Box>

                    {fetchedData.Code && (
                        <Box sx={{ width: 521, gap: 4, display: "flex", flexDirection: "row", alignItems: "center" }}>
                            <Typography
                                variant="body2"
                                color="text.secondary"
                                sx={{ fontFamily: theme.typography.fontFamily, width: '70%' }}
                            >
                                Join Google Meet via this code: {fetchedData.Code}
                            </Typography>
                            <Button
                                variant="outlined"
                                sx={{
                                    marginLeft: 2,
                                    border: '1px solid lightGrey',
                                    borderRadius: 2,
                                    textTransform: "none",
                                    fontFamily: theme.typography.fontFamily,
                                    fontSize: 12,
                                    padding: "1px 5px",
                                    color: "text.secondary",
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
                                Show QR code
                            </Button>
                        </Box>
                    )}

                    <Box sx={{ width: 521 }}>
                        <Box>
                            {questions.map((q, index) => (
                                <Box key={index} sx={{marginTop:1}}>
                                    <Typography variant="h6">{q.question}</Typography>
                                    {q.options.map((option, i) => (
                                        <Typography key={i} variant="body2" sx={{
                                            border: '1px solid lightGrey',
                                            borderRadius: 2,
                                            padding:'4px 8px',
                                            //marginTop:'2px',
                                            //marginBottom:'2px'
                                        }}>
                                            {option}
                                        </Typography>
                                    ))}
                                </Box>
                            ))}
                        </Box>

                        {isButtonVisible && (
                            <Button
                                variant="outlined"
                                startIcon={<AddIcon sx={{ fontSize: 9, height: 15, width: 15 }} />}
                                onClick={handleAddQuestionToggle}
                                sx={{
                                    marginTop: 2,
                                    marginBottom: 2,
                                    border: '1px solid lightGrey',
                                    borderRadius: 2,
                                    textTransform: "none",
                                    fontFamily: theme.typography.fontFamily,
                                    fontSize: 12,
                                    padding: "2px 6px",
                                    color: "text.secondary",
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
                                Add question
                            </Button>
                        )}
                        {isAddQuestionVisible && (
                            <AddQuestion onAddQuestion={handleQuestionSubmit} />
                        )}
                    </Box>

                    <Box sx={{ width: 521, display: "flex", flexDirection: "row", marginTop: 5 }}>
                        <Button
                            variant="outlined"
                            sx={{
                                width: '30%',
                                height: 46,
                                fontSize: 12,
                                color: "red",
                                border: '1px solid lightGrey',
                                borderRadius: 2,
                                marginRight: 1,
                                fontFamily: theme.typography.fontFamily,
                                textTransform: "none",
                                '&:hover': {
                                    backgroundColor: 'transparent',
                                    borderColor: 'lightGrey',
                                },
                                '&:active': {
                                    backgroundColor: 'transparent',
                                    borderColor: 'lightGrey',
                                },
                            }}
                            onClick={handleToggle}
                        >
                            Cancel
                        </Button>

                        <Button
                            sx={{
                                width: '70%',
                                height: 46,
                                fontSize: 12,
                                backgroundColor: '#404951',
                                color: theme.palette.white.main,
                                borderRadius: 2,
                                fontFamily: theme.typography.fontFamily,
                                textTransform: "none",
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
                            Edit Details
                        </Button>
                    </Box>
                </CardContent>
            </Card>
        </Box>
    );
};

export default MeetingDetails;
