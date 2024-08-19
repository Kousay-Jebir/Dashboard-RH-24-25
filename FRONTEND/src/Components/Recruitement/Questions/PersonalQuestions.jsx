import { Box, TextField, Typography, useTheme } from '@mui/material';
import React from 'react';

const renderTextField = ({ label, placeholder, height, fontSize }) => {
  const theme = useTheme();
  
  return (
    <Box
      sx={{
        width: '791px',
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
      }}
    >
      <Typography
        variant="body2"
        sx={{
          fontFamily: theme.typography.fontFamily,
          fontSize: '14px',
          fontWeight: theme.typography.fontWeightRegular,
          textAlign: 'left',
        }}
      >
        {label}
      </Typography>
      <TextField
        placeholder={placeholder}
        sx={{
          height: height || '31px',
          '& .MuiInputBase-root': { height: '100%' },
          '& .MuiInputBase-input': {
            fontFamily: theme.typography.fontFamily,
            fontSize: fontSize || '12px',
          },
          '& .MuiFormLabel-root': {
            fontFamily: theme.typography.fontFamily,
            fontSize: '14px',
            fontWeight: theme.typography.fontWeightRegular,
            textAlign: 'left',
          },
        }}
        
      />
    </Box>
  );
};

const PersonalQuestions = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        width: '827px',
        height: '252px',
        padding: '10px',
        gap: '14px',
        display: 'flex',
        flexDirection: 'column',
        opacity: 1,
        border: `1px solid ${theme.palette.neutral[50]}`,
      }}
    >
      <Typography
        variant="h6"
        sx={{
          fontFamily: theme.typography.fontFamily,
          fontSize: '16px',
          fontWeight: 500,
          lineHeight: '19.36px',
          textAlign: 'left',
        }}
      >
        Personal Questions
      </Typography>

      <Box
        sx={{
          width: '807px',
          display: 'flex',
          flexDirection: 'column',
          gap: '14px',
        }}
      >
        {renderTextField({
          label: '* Can you tell us a little about yourself?',
          placeholder: "Enter candidate's responses here",
          height: '50px',
        })}

        {renderTextField({
          label: '* Describe yourself in 3 words',
          placeholder: "Enter candidate's responses here",
          height: '31px',
        })}

        <Box
          sx={{
            width: '133px',
            height: '39px',
            padding: '8px 0px 0px 0px',
            display: 'flex',
            flexDirection: 'row',
            gap: '14px',
          }}
        >
          <Box
            sx={{
              width: '100px',
              display: 'flex',
              flexDirection: 'row',
              gap: '8px',
            }}
          >
            <Typography
              variant="body2"
              sx={{
                fontFamily: theme.typography.fontFamily,
                fontSize: '14px',
                fontWeight: theme.typography.fontWeightRegular,
                lineHeight: '16.94px',
                textAlign: 'left',
              }}
            >
              Score
            </Typography>
            <TextField
            placeholder="/100"
            sx={{
              marginTop:'-5px',
              height: '31px',
              '& .MuiInputBase-root': { height: '100%' },
              '& .MuiInputBase-input': {
                fontFamily: theme.typography.fontFamily,
                fontSize: '12px',
              },
              '& .MuiFormLabel-root': {
                fontFamily: theme.typography.fontFamily,
                fontSize: '14px',
                fontWeight: theme.typography.fontWeightRegular,
                textAlign: 'left',
              },
            }}
            inputProps={{
              maxLength: 3, //limits input to 3 digits
            }}
          />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default PersonalQuestions;
