import { Box, TextField, Typography, useTheme } from '@mui/material';
import React from 'react';

// Function to render a customized TextField
const renderTextField = ({ label, placeholder, height, fontSize, inputProps }) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        width: '791px',
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
          height: height || '50px',
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
        inputProps={inputProps}
      />
    </Box>
  );
};

const Experience = () => {
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
        Experience
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
          label: '* Tell us about your social experience (clubs, associations, etc.)',
          placeholder: "Enter candidate's responses here",
          height: '50px',
        })}

        {renderTextField({
          label: '* Have you worked on any collaborative projects, and how did you contribute to the team?',
          placeholder: "Enter candidate's responses here",
          height: '50px',
        })}
      </Box>
    </Box>
  );
};

export default Experience;
