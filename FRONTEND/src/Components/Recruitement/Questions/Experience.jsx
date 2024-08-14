import { Box, TextField, Typography } from '@mui/material';
import React from 'react';


const Experience = () => {
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
          border: '1px solid var(--neutral-50, #E9EAEB)',
        }}
      >
        <Typography 
          variant="h6" 
          sx={{
            fontFamily: 'Inter',
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
            height: '75px',
            padding: '8px 0px 0px 0px',
            gap: '14px',
            opacity: 1,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
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
                fontFamily: 'Inter',
                fontSize: '14px',
                fontWeight: 400,
                //lineHeight: '16.94px',
                textAlign: 'left',
              }}
            >
              * Tell us about your social experience(clubs,associations,..)
            </Typography>
            <TextField
              placeholder="Enter candidate's responses here"
              sx={{
                height: '50px',
                '& .MuiInputBase-root': {
                  height: '100%', 
                },
                '& .MuiInputBase-input': {
                  fontFamily: 'Inter',
                  fontSize: '12px',
                },
                '& .MuiFormLabel-root': {
                  fontFamily: 'Inter',
                  fontSize: '14px',
                  fontWeight: 400,
                  lineHeight: '16.94px',
                  textAlign: 'left',
                },
              }}
             
            />
          </Box>
  
         
         
        </Box>

        <Box
          sx={{
            width: '807px',
            height: '75px',
            padding: '8px 0px 0px 0px',
            gap: '14px',
            opacity: 1,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
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
                fontFamily: 'Inter',
                fontSize: '14px',
                fontWeight: 400,
                //lineHeight: '16.94px',
                textAlign: 'left',
              }}
            >
              * Have you worked on any collaborative projects,and how did you contribute to the team?
            </Typography>
            <TextField
              placeholder="Enter candidate's responses here"
              sx={{
                height: '50px',
                '& .MuiInputBase-root': {
                  height: '100%', 
                },
                '& .MuiInputBase-input': {
                  fontFamily: 'Inter',
                  fontSize: '12px',
                },
                '& .MuiFormLabel-root': {
                  fontFamily: 'Inter',
                  fontSize: '14px',
                  fontWeight: 400,
                  lineHeight: '16.94px',
                  textAlign: 'left',
                },
              }}
             
            />
          </Box>
  
         
         
        </Box>
  
       

       
      </Box>
    );
  };

  export default Experience;
