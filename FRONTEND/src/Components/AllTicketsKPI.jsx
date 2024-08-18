import ChatIcon from '@mui/icons-material/Chat';
import PersonIcon from '@mui/icons-material/Person';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import Grid from '@mui/material/Grid';
import React from 'react';
import TicketKPI from './TicketKPI';

const AllTicketsKPI = () => {
  return (
    <Grid 
      container 
      spacing={2} 
      sx={{
        width: '1061px',
        height:'84px',
        position: 'absolute',
        top: '216px',
        left: '348px',
    
      }}
    >
      <Grid item xs={3}>
        <TicketKPI 
          title="Total members"
          value="118"
          icon={<PersonIcon />}
        />
      </Grid>
      <Grid item xs={3}>
        <TicketKPI 
          title="Total Workshops"
          value="15"
          icon={<WbSunnyIcon />}
        />
      </Grid>
      <Grid item xs={3}>
        <TicketKPI 
          title="Team Buildings"
          value="3"
          icon={<WhatshotIcon />}
        />
      </Grid>
      <Grid item xs={3}>
        <TicketKPI 
          title="Meetings"
          value="20"
          icon={<ChatIcon />}
        />
      </Grid>
    </Grid>
  );
};

export default AllTicketsKPI;
