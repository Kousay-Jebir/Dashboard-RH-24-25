import React from 'react';
import { Grid,Box } from '@mui/material';
import { Outlet, useLocation } from 'react-router-dom';
import SelectMenu from '../../SelectMenu';
import routesConfig from '../../../router/app-routes';


export default function MainContentLayout() {
  const location = useLocation();
  const currentPath = location.pathname;

  const getMenuData = () => {
    if (currentPath.startsWith('/recruitement/interviews')) {
      return routesConfig.recruitment.menu.interviews;
    } else if (currentPath.startsWith('/recruitement/schedule')) {
      return routesConfig.recruitment.menu.schedule;
    } else if (currentPath.startsWith('/meetings/meetings')) {
      return routesConfig.meetings.menu.meetings;
    } else {
      return [];
    }
  };

  let menuData = getMenuData();
  if(currentPath.includes("questions")){
    menuData = []
  }

  // Conditional rendering based on whether menuData is empty
  if (menuData.length === 0) {
    return <Box p={3} pt={4}><Outlet/></Box>;
  }

  return (
    <Grid container p={3} pt={4} spacing={2}>
      <Grid item xs={12} sm={4} md={2.5}>
        <SelectMenu menuData={menuData} />
      </Grid>
      <Grid item xs={12} sm={8} md={9.5} sx={{ overflow: 'auto' }}>
        <Outlet />
      </Grid>
    </Grid>
  );
}
