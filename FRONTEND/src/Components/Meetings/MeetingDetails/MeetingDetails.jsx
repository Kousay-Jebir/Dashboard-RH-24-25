import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import CloseIcon from '@mui/icons-material/Close';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { Box, Button, Card, CardContent, IconButton, Typography, TextField } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import React, { useState,useEffect } from 'react';
import HorizontalBarGraph from './HorizontalBarGraph';
import QRCodeDialog from './QrCodeDialog';
import useApi from '../../../service/useApi';
import { api } from '../../../service/api';
import EditMeeting from './EditMeeting';

const MeetingDetails = ({ meetingId, handleDrawerToggle, updateMeetingService ,type}) => {
  const theme = useTheme();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [numMembers, setNumMembers] = useState(null);
  const [numPresent,setNumPresent] = useState(null);
  const [isAddingQuestion, setIsAddingQuestion] = useState(false);
  const [newQuestionTitle, setNewQuestionTitle] = useState('');
  const [questions, setQuestions] = useState([]);
  const [updating, setUpdating] = useState(-1);

  const { data, error, loading } = useApi(() => api.getMeetingById(meetingId), {});
  const {data:meetingQuestions,error:errorQuestions,loading:loadingQuestion} = useApi(() => api.getMeetingQuestionByID(meetingId), {})
  const fetchedData = data?.data

  useEffect(() => {
      if (meetingQuestions?.data) {
        setQuestions(meetingQuestions.data);
      }
    }, [meetingQuestions]);

    const fetchNumberOfMembers = async (department) => {  
      try {
        const response = await api.getNumberOfMembersByDepartment({ department });
        setNumMembers(response.data.count); 
      } catch (error) {
        console.error('Error fetching number of members:', error);
    };
  }

  const fetchNumberOfPresent = async (type) => {  
    try {
      const response = await api.getMeetingPresentList(type,meetingId);
      setNumPresent(response.data.presentMembersCount); 
    } catch (error) {
      console.error('Error fetching number of members:', error);
  };
}


  
  
    useEffect(() => {
      if (fetchedData && fetchedData.department) {
        fetchNumberOfMembers(fetchedData.department);
      }
    }, [fetchedData]);

    useEffect(() => {
      if (fetchedData && fetchedData.department) {
        fetchNumberOfPresent(type);
      }
    }, [fetchedData]);

  const handleToggle = () => handleDrawerToggle(false)();
  const handleDialogOpen = () => setDialogOpen(true);
  const handleDialogClose = () => setDialogOpen(false);

  const handleEdit = () => setUpdating(meetingId);

  const handleAddQuestion = () => setIsAddingQuestion(true);

  const handleDiscardQuestion = () => {
    setIsAddingQuestion(false);
    setNewQuestionTitle('');
  };

  const handleCreateQuestion = async () => {
    try {
      const response = await api.createMeetingQuestion({
        question: newQuestionTitle,
        MeetingUniqueCode: fetchedData?.uniqueCode,
      });
      console.log('Question Created:', response.data);

      // Add the new question to the local state
      setQuestions((prev) => [
        ...prev,
        response.data.data,
      ]);

      // Reset form after successful creation
      setIsAddingQuestion(false);
      setNewQuestionTitle('');
    } catch (error) {
      console.error('Error creating question:', error);
    }
  };

  const renderQuestions = () => (
    <Box sx={{ marginTop: 4 }}>
      <Typography variant="h6" sx={{ fontFamily: theme.typography.fontFamily, fontWeight: 'bold', marginBottom: 2 }}>
        Questions
      </Typography>
      {questions.length === 0 ? (
        <Typography sx={{ fontSize: 14, color: theme.palette.text.secondary }}>No questions added yet.</Typography>
      ) : (
        questions.map((q, index) => (
          <Box key={index} sx={{ marginBottom: 2, padding: 2, border: '1px solid #ccc', borderRadius: 2 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
              {q.question}
            </Typography>
            <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
              Yes: {(q.yes * 100).toFixed(1)}%, No: {(q.no*100).toFixed(1)}%, Refrained: {(q.refrained * 100).toFixed(1)}%
            </Typography>
          </Box>
        ))
      )}
    </Box>
  );

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

  const statusColors = {
    Confirmed: theme.palette.success.text,
    Delayed: theme.palette.warning.text,
    Cancelled: theme.palette.error.main,
  };

  const StatusColor = statusColors[fetchedData?.status] || theme.palette.text.primary;
  const stats = { present: numPresent, absent: numMembers-numPresent };
  const colors = ['#6A7177', '#BFC2C5'];

  if (!fetchedData) return <p>Loading meeting details...</p>;

  return updating !== -1 ? (
    <EditMeeting meetingId={meetingId} updateMeetingService={updateMeetingService} />
  ) : (
    <Box sx={{ gap: 34, fontFamily: theme.typography.fontFamily, maxWidth: 521, height: '100%' }}>
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
                Join Google Meet via this code:
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
              <QRCodeDialog open={dialogOpen} handleClose={handleDialogClose} qrValue={fetchedData.uniqueCode}/>
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
            <Typography>{`Presence: ${numPresent} / ${numMembers}`}</Typography>
            <HorizontalBarGraph stats={stats} colors={colors} />
          </Box>

          {renderQuestions()}

          {isAddingQuestion ? (
            <Box sx={{ marginTop: 3 }}>
              <TextField
                label="Question Title"
                value={newQuestionTitle}
                onChange={(e) => setNewQuestionTitle(e.target.value)}
                fullWidth
                sx={{ marginBottom: 2 }}
              />
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
          ) : (
            <Button sx={{ marginTop: 3 ,textTransform:'none'}} size='small' color='secondary' variant="outlined" onClick={handleAddQuestion}>
              + Add Question
            </Button>
          )}

          <Box sx={{ width: '100%', display: 'flex', flexDirection: 'row', position: 'relative', marginTop: 3 }}>
            <Button
              variant="outlined"
              sx={{
                width: '30%',
                height: 46,
                fontSize: 12,
                color: 'red',
                border: '1px solid lightGrey',
                borderRadius: 2,
                marginRight: 1,
                fontFamily: theme.typography.fontFamily,
                textTransform: 'none',
                '&:hover': { backgroundColor: 'transparent', borderColor: 'lightGrey' },
                '&:active': { backgroundColor: 'transparent', borderColor: 'lightGrey' },
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
                textTransform: 'none',
                '&:hover': { backgroundColor: '#404951', borderColor: 'lightGrey' },
                '&:active': { backgroundColor: '#404951', borderColor: 'lightGrey' },
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
