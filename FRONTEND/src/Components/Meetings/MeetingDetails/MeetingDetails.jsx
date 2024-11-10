import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import CloseIcon from '@mui/icons-material/Close';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PersonIcon from '@mui/icons-material/Person';
import { Box, Button, Card, CardContent, IconButton, Typography, TextField } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import React, { useState } from 'react';
import HorizontalBarGraph from './HorizontalBarGraph';
import QRCodeDialog from './QrCodeDialog';
import useApi from '../../../service/useApi';
import { api } from '../../../service/api';
import { set } from 'date-fns';
import EditMeeting from './EditMeeting';

const MeetingDetails = ({meetingId,handleDrawerToggle,updateMeetingService}) => {
  const theme = useTheme();
  const [isVisible, setIsVisible] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [updating,setUpdating] = useState(-1);
  const [isAddingQuestion, setIsAddingQuestion] = useState(false);
  const [newQuestion, setNewQuestion] = useState({
    title: '',
    options: ['', ''],
  });
  const { data, error, loading } = useApi(() => api.getMeetingById(meetingId), {});
  const fetchedData = data?.data;
  console.log("meetingdetails")
  console.log(fetchedData)

  const handleToggle = () => {handleDrawerToggle(false)()};
  const handleDialogOpen = () => setDialogOpen(true);
  const handleDialogClose = () => setDialogOpen(false);
  const handleEdit = (meetingId)=>{
    setUpdating((prev)=>meetingId)
  }
  const handleAddQuestion = () => {
    setIsAddingQuestion(true); // Show form to add a new question
  };

  const handleRemoveOption = (index) => {
    const updatedOptions = newQuestion.options.filter((_, i) => i !== index);
    setNewQuestion({ ...newQuestion, options: updatedOptions });
  };

  const handleAddOption = () => {
    setNewQuestion({ ...newQuestion, options: [...newQuestion.options, ''] });
  };

  const handleQuestionTitleChange = (e) => {
    setNewQuestion({ ...newQuestion, title: e.target.value });
  };

  const handleOptionChange = (index, e) => {
    const updatedOptions = newQuestion.options.map((option, i) =>
      i === index ? e.target.value : option
    );
    setNewQuestion({ ...newQuestion, options: updatedOptions });
  };

  const handleDiscardQuestion = () => {
    setIsAddingQuestion(false);
    setNewQuestion({ title: '', options: ['', ''] });
  };

  const handleCreateQuestion = async () => {
    try {
      // Send POST request to create the question
      const response = await api.createMeetingQuestion({
        question: newQuestion.title,
        MeetingUniqueCode: fetchedData?.uniqueCode, // Assuming this is the unique code for the meeting
      });
      console.log('Question Created:', response.data);
      setIsAddingQuestion(false); // Hide form after creating the question
      setNewQuestion({ title: '', options: ['', ''] }); // Reset form
    } catch (error) {
      console.error('Error creating question:', error);
    }
  };

  const handleAnswerQuestion = async (questionId, answer) => {
    try {
      // Send POST request to submit the answer
      const response = await api.answerMeetingQuestion( {
        questionId,
        answer,
      });
      console.log('Answer Submitted:', response.data);
    } catch (error) {
      console.error('Error submitting answer:', error);
    }
  };

  const defaultBoxStyles = {
    display: 'flex',
    alignItems: 'center',
    gap: 1,
    fontFamily: theme.typography.fontFamily,
    fontSize: 14,
  };

  const defaultTextStyles = {
    fontFamily: theme.typography.fontFamily,
    fontWeight: theme.typography.fontWeightRegular,
    fontSize: 14,
  };

  // Status colors mapping based on status text
  const statusColors = {
    Confirmed: theme.palette.success.text,
    Delayed: theme.palette.warning.text,
    Cancelled: theme.palette.error.text,
  };

  const StatusColor = statusColors[fetchedData?.status] || theme.palette.text.primary; // Default to primary text color if not found
  const stats = { present: 50, justifiedAbsence: 10, unjustifiedAbsence: 5 };
  const colors = ['#6A7177', '#BFC2C5', '#E9EAEB'];

  if (!fetchedData) return <p>Loading meeting details...</p>;

  return (
    updating !== -1 ? <EditMeeting meetingId={meetingId} updateMeetingService={updateMeetingService} /> : 
    <Box sx={{ gap: 34, fontFamily: theme.typography.fontFamily, minWidth: 521, height: '100%' }}>
      <Card elevation={0} sx={{ height: '100%', overflow: 'scroll' }}>
        <CardContent sx={{ position: 'relative' }}>
          <IconButton
            onClick={handleToggle}
            sx={{ position: 'absolute', top: 10, right: 10, zIndex: 1 }}
            aria-label="Close meeting details"
          >
            <CloseIcon />
          </IconButton>

          <Typography variant="h5" sx={{ fontFamily: theme.typography.fontFamily, fontWeight: 'bold', fontSize: 18 }}>
            Meeting Details
          </Typography>

          <Box sx={{ marginTop: 2 }}>
            <Typography variant="h5" sx={{ fontFamily: theme.typography.fontFamily, fontWeight: 'bold', fontSize: 18 }}>
              {fetchedData.title}
            </Typography>

            <Box sx={defaultBoxStyles}>
              <AccessTimeIcon fontSize="small" />
              <Typography variant="body2" sx={defaultTextStyles}>{fetchedData.time}</Typography>
            </Box>

            <Box sx={defaultBoxStyles}>
              <CalendarTodayIcon fontSize="small" />
              <Typography variant="body2" sx={defaultTextStyles}>{fetchedData.date}</Typography>
            </Box>

            {fetchedData.place && (
              <Box sx={defaultBoxStyles}>
                <LocationOnIcon fontSize="small" />
                <Typography variant="body2" sx={defaultTextStyles}>{fetchedData.place}</Typography>
              </Box>
            )}
          </Box>
          {fetchedData.uniqueCode && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, marginTop: 2 }}>
              <Typography variant="body2" color="text.secondary" sx={{ fontFamily: theme.typography.fontFamily }}>
                Join Google Meet via this code: code
              </Typography>
              <Button
                sx={{
                  fontSize: 10,
                  color: 'grey',
                  border: '1px solid lightGrey',
                  borderRadius: 2,
                  fontFamily: theme.typography.fontFamily,
                  '&:hover': { backgroundColor: 'white', borderColor: 'lightGrey' },
                  '&:active': { backgroundColor: 'white', borderColor: 'lightGrey' },
                }}
                onClick={handleDialogOpen}
              >
                Show QR Code
              </Button>
              <QRCodeDialog open={dialogOpen} handleClose={handleDialogClose} />
            </Box>
          )}
          <Box sx={{ display: 'flex', gap: 8, marginTop: 2 }}>
            <Box
              sx={{
                padding: '0 8px',
                border: '1px solid lightGrey',
                borderRadius: 1,
                backgroundColor: StatusColor,
                color: theme.palette.white.main,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {fetchedData.status || 'Confirmed'}
            </Box>
            <Box
              sx={{
                padding: '0 3px',
                border: '1px solid lightGrey',
                borderRadius: 1,
                alignItems: 'center',
                justifyContent: 'center',
                marginLeft: -7,
              }}
            >
              {fetchedData.department || 'All members included'}
            </Box>
          </Box>

          <Box sx={{ marginTop: 5 }}>
            <Typography>{`Presence: ${stats.present} / ${stats.present + stats.unjustifiedAbsence + stats.justifiedAbsence}`}</Typography>
            <HorizontalBarGraph stats={stats} colors={colors} />
          </Box>

          {/* Add Question Button */}
          {!isAddingQuestion ? (
            <Button
              sx={{ marginTop: 3 }}
              variant="contained"
              onClick={handleAddQuestion}
            >
              Add Question
            </Button>
          ) : (
            <Box sx={{ marginTop: 3 }}>
              <TextField
                label="Question Title"
                value={newQuestion.title}
                onChange={handleQuestionTitleChange}
                fullWidth
                sx={{ marginBottom: 2 }}
              />

              {/* Render options */}
              {newQuestion.options.map((option, index) => (
                <Box sx={{ display: 'flex', gap: 2, marginBottom: 1 }} key={index}>
                  <TextField
                    label={`Option ${index + 1}`}
                    value={option}
                    onChange={(e) => handleOptionChange(index, e)}
                    fullWidth
                  />
                  <IconButton onClick={() => handleRemoveOption(index)} sx={{ color: 'red' }}>
                    <CloseIcon />
                  </IconButton>
                </Box>
              ))}

              <Button
                variant="outlined"
                onClick={handleAddOption}
                sx={{ marginBottom: 2 }}
              >
                Add Option
              </Button>

              {/* Discard or Create buttons */}
              <Box sx={{ display: 'flex', gap: 2 }}>
                <Button
                  variant="outlined"
                  onClick={handleDiscardQuestion}
                  sx={{ color: 'red', borderColor: 'red' }}
                >
                  Discard
                </Button>

                <Button
                  variant="contained"
                  onClick={handleCreateQuestion}
                  sx={{ backgroundColor: '#404951' }}
                >
                  Create Question
                </Button>
              </Box>
            </Box>
          )}
                    <Box sx={{ width: '100%', display: "flex", flexDirection: "row",position:'relative',overflow:'scroll',top:300}}>
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
                            onClick={handleEdit}
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
