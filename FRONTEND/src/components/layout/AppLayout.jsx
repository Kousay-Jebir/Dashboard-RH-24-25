import * as React from 'react';
import { Box, CssBaseline, Divider, Toolbar } from '@mui/material';
import { useLocation, Outlet } from 'react-router-dom';
import { useRoutes } from '../../router/context/RoutesContext';
import TopBar from './TopBar';
import SideBar from './SideBar';
import AppBreadCrumbs from './AppBreadCrumbs';
import NavigationTabs from '../NavigationTabs';
import { Schedule } from '@mui/icons-material';

const drawerWidth = 305;

function AppLayout() {
  const location = useLocation();
  const routesConfig = useRoutes(); // Get the routing configuration from context

  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isClosing, setIsClosing] = React.useState(false);

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  // Determine the current route and get the corresponding tabs configuration
  const currentPath = location.pathname.split('/').slice(0, 3).join('/'); // Gets the base path like /recruitment
  console.log(currentPath)
  const basePath = currentPath.split('/').slice(0, 2).join('/'); // Gets the base path like /recruitment
  
  function getSubPaths(basePath) {
    // Find the key that matches the base path
    for (const key in routesConfig) {
      const value = routesConfig[key];
  
      // Check if value is an object and has the 'root' path matching the basePath
      if (typeof value === 'object' && value.root === basePath) {
        // Return all sub-paths from the 'tabs' object, prefixed with '/'
        const tabs = value.tabs;
        if (tabs) {
          return Object.keys(tabs)
            .map(subKey => `/${subKey}`);
        }
      }
    }
  
    // If no matching base path is found, return an empty array
    return [];
  }

  let tabs = getSubPaths(basePath)
  console.log(tabs)
  

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <TopBar handleDrawerToggle={handleDrawerToggle} drawerWidth={drawerWidth} />
      <SideBar
        drawerWidth={drawerWidth}
        mobileOpen={mobileOpen}
        handleDrawerClose={handleDrawerClose}
        handleDrawerTransitionEnd={handleDrawerTransitionEnd}
      />
      <Box component="main" sx={{ flexGrow: 1, width: { sm: `calc(100% - ${drawerWidth}px)` } }}>
        <Toolbar />
        <Box mt={3} p={2}>
          <AppBreadCrumbs />
        </Box>
        <Divider sx={{ border: 1, borderColor: 'neutral.light' }} />
        {tabs.length > 0 && (
          <Box>
            <NavigationTabs basePath={basePath} tabs={tabs} />
            {/* <Schedule schedule={}></Schedule> */}
          </Box>
        )}
        {tabs.length > 0 && (
        <Divider sx={{ border: 1, borderColor: 'neutral.light', position: 'relative', top: '-1%', zIndex: '-100' }} />)}
        <Outlet />
      </Box>
    </Box>
  );
}

export default AppLayout;
