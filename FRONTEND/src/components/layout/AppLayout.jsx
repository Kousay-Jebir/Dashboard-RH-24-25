import React from 'react';
import { Grid, Box,Divider } from '@mui/material';
import TopBar from '../TopBar';
import AppName from '../AppName';
import SideBar from '../SideBar';

const AppLayout = ({ children }) => {
  return (
    <Grid container >
      
      {/* Sidebar */}
      <Grid item xs={3} borderRight={1}>
        <SideBar/>
      </Grid>
      
      <Grid item xs={9}>
        <Box>
            <TopBar/>
          <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
            {children}
          </Box>

        </Box>
      </Grid>
      
      
    </Grid>
  );
};

export default AppLayout;
