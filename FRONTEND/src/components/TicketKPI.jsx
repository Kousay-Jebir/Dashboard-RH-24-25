import { Box, Typography } from '@mui/material';
import React from 'react';

const TicketKPI = () => {
  return (
    <Box
      sx={{
        width: '254.75px',          
        height: '84px',              
        padding: '15px 16px',        
        gap: '85px',                 
        borderRadius: '5px 0px 0px 0px',  
        border: '0.1px solid  Lightgrey',
        
      }}
    >
      <Typography
        variant="h6"
        sx={{
          fontWeight: 'bold',
          marginBottom: '10px',
        }}
      >
        KPI Title
      </Typography>
      <Typography variant="body2">
        KPI Value
      </Typography>
    </Box>
  );
};

export default TicketKPI;
