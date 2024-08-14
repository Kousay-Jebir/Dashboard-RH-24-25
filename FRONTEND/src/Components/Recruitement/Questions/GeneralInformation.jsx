//import EmailIcon from '@mui/icons-material/Email';
import PersonIcon from '@mui/icons-material/Person';
import { Box, InputAdornment, TextField, Typography } from '@mui/material';
import React from 'react';


const GeneralInformation = () => {
  return (
    <Box
      sx={{
        width: '827px',
        height: '210px',
        padding: '10px',
        gap: '10px',
        borderRadius: '9px',
        borderWidth: '1px',
        borderStyle: 'solid',
        borderColor: 'black',
        opacity: 1,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Typography variant="h6" sx={{ paddingLeft: '10px' }}>
        General Information
      </Typography>

      <Box sx={{ display: 'flex', gap: '10px', padding: '0 10px' }}>
        <TextField
          label="Name"
          placeholder="Enter the candidate's name"
          variant="outlined"
          sx={{ width: '221px', height: '28px' }} // Adjust width and height here
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <PersonIcon />
              </InputAdornment>
            ),
          }}
        />
        <TextField
          label="Last name"
          placeholder="Enter the candidate's last name"
          variant="outlined"
          sx={{ width: '225px', height: '28px' }} // Adjust width and height here
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <PersonIcon />
              </InputAdornment>
            ),
          }}
        />
        <TextField
          label="Email Adress"
          placeholder="Enter the candidate's email adress"
          variant="outlined"
          sx={{ width: '321px', height: '31px' }} // Adjust width and height here
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <PersonIcon />
              </InputAdornment>
            ),
          }}
        />
      </Box>

      {/* Second Line */}
      <Box sx={{ padding: '10px 10px 0px 10px' }}>
        {/* Add content for the second line here */}
      </Box>
    </Box>
  );
};

export default GeneralInformation;
