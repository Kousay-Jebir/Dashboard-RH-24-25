import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import CloseIcon from '@mui/icons-material/Close';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PersonIcon from '@mui/icons-material/Person';
import { Box, Button, Card, CardContent, IconButton, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import React, { useEffect, useState } from 'react';
import AddQuestion from './AddQuestion';
import HorizontalBarGraph from './HorizontalBarGraph';
import meetingData from './MeetingDetailsData.json';
import QRCodeDialog from './QrCodeDialog';

const MeetingDetails = () => {
  const theme = useTheme();
  const [fetchedData, setFetchedData] = useState(null);
  const [isVisible, setIsVisible] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    setFetchedData(meetingData);
  }, []);

  const handleToggle = () => setIsVisible(!isVisible);
  const handleDialogOpen = () => setDialogOpen(true);
  const handleDialogClose = () => setDialogOpen(false);

  const handleAddQuestion = (newQuestion) => {
    setQuestions((prevQuestions) => [...prevQuestions, newQuestion]);
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

  const StatusColor = fetchedData?.Status?.StatusColor || '';
  const stats = { present: 50, absent: { justified: 10, unjustified: 5 } };
  const colors = ['#6A7177', '#BFC2C5', '#E9EAEB'];

  if (!fetchedData) return <p>Loading meeting details...</p>;

  return (
    <Box sx={{gap: 34, display: 'flex', justifyContent: 'flex-end', fontFamily: theme.typography.fontFamily }}>
      <Card>
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
              {fetchedData.Title} {fetchedData.Ag || ''}
            </Typography>

            <Box sx={defaultBoxStyles}>
              <AccessTimeIcon fontSize="small" />
              <Typography variant="body2" sx={defaultTextStyles}>{fetchedData.Time}</Typography>
            </Box>

            <Box sx={defaultBoxStyles}>
              <CalendarTodayIcon fontSize="small" />
              <Typography variant="body2" sx={defaultTextStyles}>{fetchedData.Date}</Typography>
            </Box>

            {fetchedData.Place && (
              <Box sx={defaultBoxStyles}>
                <LocationOnIcon fontSize="small" />
                <Typography variant="body2" sx={defaultTextStyles}>{fetchedData.Place}</Typography>
              </Box>
            )}

            <Box sx={defaultBoxStyles}>
              <PersonIcon fontSize="small" />
              <Typography variant="body2" sx={defaultTextStyles}>added by {fetchedData.AddedBy}</Typography>
            </Box>
          </Box>

          {fetchedData.Code && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, marginTop: 2 }}>
              <Typography variant="body2" color="text.secondary" sx={{ fontFamily: theme.typography.fontFamily }}>
                Join Google Meet via this code: {fetchedData.Code}
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
              {fetchedData.Status?.StatusText || 'Confirmed'}
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
              {fetchedData.Department || 'All members included'}
            </Box>
          </Box>

          <HorizontalBarGraph stats={stats} colors={colors} />

          <Box sx={{ mt: 3 }}>
            <AddQuestion onAddQuestion={(newQuestion) => setQuestions([...questions, newQuestion])} />
          </Box>

          

          <Box sx={{ width: '100%', display: "flex", flexDirection: "row", marginTop: 5 }}>
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
