import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import React, { useEffect, useState } from 'react';
import meetingData from './MeetingDetailsData.json';

const EditMeeting = () => {
  const theme = useTheme();
  const [fetchedData, setFetchedData] = useState(null);

  useEffect(() => {
      setFetchedData(meetingData);
  }, []);

  if (!fetchedData) {
      return <p>Loading meeting details...</p>;
  }

  const renderTextField = (label, width, placeholder, value) => (
      <Box sx={{ width: '216px', height: '20px', display: 'flex', flexDirection: 'row', gap: '6px' }}>
          <Typography
              variant="body2"
              sx={{
                  fontFamily: theme.typography.fontFamily,
                  fontSize: '10px',
                  fontWeight: theme.typography.regular,
                  lineHeight: '12.1px',
                  textAlign: 'left',
              }}
          >
              {label}
          </Typography>
          <TextField
              placeholder={placeholder}
              defaultValue={value}
              sx={{
                  height: '20px',
                  width: width,
                  '& .MuiInputBase-root': { height: '100%' },
                  '& .MuiInputBase-input': { fontFamily: theme.typography.fontFamily, fontSize: '10px' },
              }}
          />
      </Box>
  );

  return (
      <Box sx={{
          width: '236px',
          height: '300px',
          gap: '7px',
          border: '1px solid lightGrey',
          paddingLeft: '10px',
          paddingTop: '10px'
      }}>
          <Box sx={{ width: '216px', height: '84px', gap: '8px', display: 'flex', flexDirection: 'column' }}>
              <Typography
                  variant="h6"
                  sx={{
                      fontFamily: theme.typography.fontFamily,
                      fontSize: '10px',
                      fontWeight: theme.typography.regular,
                      lineHeight: '12.1px',
                      textAlign: 'left',
                  }}
              >
                  Edit Meeting
              </Typography>
              {renderTextField('Title', '142px', 'Enter title', fetchedData.Title)}
              {renderTextField('Place', '108px', 'Enter place', fetchedData.Place)}
          </Box>

          <Box sx={{ width: '216px', height: '84px', gap: '8px', display: 'flex', flexDirection: 'column' }}>
              {renderTextField('Date', '108px', 'Enter date', fetchedData.Date)}
              {renderTextField('Time', '108px', 'Enter time', fetchedData.Time)}
          </Box>

          <Box sx={{ width: '216px', height: '102px', gap: '8px', paddingTop: '10px' }}>
              <FormControl component="fieldset">
                  <Typography
                      variant="subtitle1"
                      sx={{
                          fontFamily: theme.typography.fontFamily,
                          fontSize: '10px',
                          fontWeight: theme.typography.regular,
                          lineHeight: '12.1px',
                          textAlign: 'left',
                      }}
                  >
                      Choose department
                  </Typography>
                  <RadioGroup
                      aria-label="department"
                      name="department"
                      defaultValue={fetchedData.Department || 'Projects'}
                      sx={{ display: 'flex', flexDirection: 'row', gap: '10px', marginLeft: '10px', marginTop: '5px' }}
                  >
                      {['Development Commercial', 'Projects', 'Marketing', 'Cellule Qualité'].map(dept => (
                          <FormControlLabel
                              key={dept}
                              value={dept.toLowerCase().replace(' ', '_')}
                              control={<Radio sx={{ width: '12px', height: '12px', marginRight: '4px' }} />}
                              label={
                                  <Typography
                                      sx={{
                                          fontFamily: theme.typography.fontFamily,
                                          fontSize: '10px',
                                          fontWeight: theme.typography.regular,
                                          lineHeight: '12.1px',
                                          textAlign: 'left',
                                          gap: '5px'
                                      }}
                                  >
                                      {dept}
                                  </Typography>
                              }
                          />
                      ))}
                  </RadioGroup>
              </FormControl>
          </Box>

          <Box>
              <Button
                  sx={{
                      width: '216px',
                      height: '24px',
                      padding: '6px 6px 6px 6px',
                      gap: '8px',
                      color: 'white',
                      borderRadius: '4px',
                      border: `1px solid ${theme.palette.neutral}`,
                      backgroundColor: '#404951',
                      textAlign: 'center',
                      fontSize: '10px',
                      marginTop: '30px',
                  }}
              >
                  Save Changes
              </Button>
          </Box>
      </Box>
  );
};

export default EditMeeting;
