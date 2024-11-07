import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import CloseIcon from '@mui/icons-material/Close';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PersonIcon from '@mui/icons-material/Person';
import { Box, Button, Card, CardContent, IconButton, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import React, { useEffect, useState } from 'react';
import HorizontalBarGraph from './HorizontalBarGraph';
import meetingData from './MeetingDetailsData.json';
import QRCodeDialog from './QrCodeDialog';

const MeetingDetails = () => {
  const theme = useTheme();
  const [fetchedData, setFetchedData] = useState(null);
  const [isVisible, setIsVisible] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    setFetchedData(meetingData);
  }, []);

  const handleToggle = () => {
    setIsVisible(!isVisible);
  };

  const handleDialogOpen = () => setDialogOpen(true);
  const handleDialogClose = () => setDialogOpen(false);

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
  const stats = {
    present: 50,
    absent: {
      justified: 10,
      unjustified: 5,
    },
  };

  const colors = ['#6A7177', '#BFC2C5', '#E9EAEB'];

  if (!fetchedData) {
    return <p>Loading meeting details...</p>;
  }

  return (
    <Box sx={{ gap: 34, display: 'flex', justifyContent: 'flex-end', fontFamily: theme.typography.fontFamily }}>
      <Card>
        <CardContent sx={{ position: 'relative' }}>
          <IconButton
            onClick={handleToggle}
            sx={{ position: 'absolute', top: 10, right: 10, zIndex: 1 }}
            aria-label="Close meeting details"
          >
            <CloseIcon />
          </IconButton>

          <Box sx={{ width: 521, height: 21, gap: 12 }}>
            <Typography variant="h5" sx={{ fontFamily: theme.typography.fontFamily, fontWeight: 'bold', fontSize: 18 }}>
              Meeting details
            </Typography>
          </Box>

          <Box sx={{ marginTop: 2, width: 521, height: 127, gap: 14 }}>
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
            <Box sx={{ width: '100%', display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 2 }}>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ fontFamily: theme.typography.fontFamily }}
            >
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
                '&:active': { backgroundColor: 'white', borderColor: 'lightGrey' }
              }}
              onClick={handleDialogOpen}
            >
              Show QR Code
            </Button>
            
            <QRCodeDialog open={dialogOpen} handleClose={handleDialogClose} />
          </Box>
          
          )}

          <Box sx={{ width: 280, height: 23, marginTop: 2, gap: 8, display: 'flex', fontSize: 12, alignItems: 'center' }}>
            <Box
              sx={{
                height: 23,
                width: 'auto',
                padding: '0 8px',
                fontFamily: theme.typography.fontFamily,
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
                height: 23,
                maxWidth: 180,
                padding: '0 3px',
                fontFamily: theme.typography.fontFamily,
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

          <Box sx={{ width: '100%', height:200, gap: 8, marginTop: 2 }}>
            <HorizontalBarGraph stats={stats} colors={colors} />
          </Box>

          <Box sx={{ width: 521, height: 100, gap: 8 }}>
            <Button
              variant="outlined"
              sx={{
                width: 195,
                height: 46,
                fontSize: 10,
                color: theme.palette.error.main,
                border: '1px solid lightGrey',
                borderRadius: 2,
                marginRight: 1,
                fontFamily: theme.typography.fontFamily,
                '&:hover': { backgroundColor: 'transparent', borderColor: 'lightGrey' },
                '&:active': { backgroundColor: 'transparent', borderColor: 'lightGrey' },
              }}
              onClick={handleToggle}
            >
              Cancel
            </Button>

            <Button
              sx={{
                width: 280,
                height: 46,
                fontSize: 10,
                backgroundColor: '#404951',
                color: theme.palette.white.main,
                border: '1px solid lightGrey',
                borderRadius: 2,
                fontFamily: theme.typography.fontFamily,
                '&:hover': { backgroundColor: '#404951', borderColor: 'lightGrey' },
                '&:active': { backgroundColor: '#404951', borderColor: 'lightGrey' },
              }}
            >
              Edit details
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default MeetingDetails;
