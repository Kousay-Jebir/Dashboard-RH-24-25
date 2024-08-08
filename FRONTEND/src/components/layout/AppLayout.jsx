import React from 'react';
import { Grid, Box,Divider } from '@mui/material';
import TopBar from '../TopBar';
import AppName from '../AppName';
import SideBar from '../SideBar';
import { Outlet } from 'react-router-dom';
import AppBreadCrumbs from '../AppBreadCrumbs';
import { useTheme } from '@emotion/react';

const AppLayout = ({ children }) => {
  const theme = useTheme()
  return (
    <Grid container >
      
      {/* Sidebar */}
      <Grid item xs={3} borderRight={1} >
        <SideBar/>
      </Grid>
      
      <Grid item xs={9}>
        <Box>
            <TopBar/>
          <Box component="main" sx={{ flexGrow: 1 }}>
            <AppBreadCrumbs></AppBreadCrumbs>
            <Outlet></Outlet>
          </Box>

        </Box>
      </Grid>
      
      
    </Grid>
  );
};

export default AppLayout;
