import * as React from 'react';
import { Box, CssBaseline, Divider, Toolbar } from '@mui/material';
import { useLocation, Outlet } from 'react-router-dom';
import { useRoutes } from '../../../router/context/RoutesContext';
import TopBar from './TopBar';
import SideBar from './SideBar';
import AppBreadCrumbs from './AppBreadCrumbs';
import NavigationTabs from '../../NavigationTabs';

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
  const basePath = currentPath.split('/').slice(0, 2).join('/');

  function getSubPaths(basePath) {
    // Iterate through each key in routesConfig
    for (const key in routesConfig) {
        const value = routesConfig[key];

        // Check if the current value is an object and has the 'root' path matching the basePath
        if (typeof value === 'object' && value.root === basePath) {
            // Return the 'tabs' array if it exists
            const tabs = value.tabs;
            if (tabs) {
                return tabs
            }
        }
    }
    // Return an empty array if no matching root path is found
    return [];
}

  let tabs = getSubPaths(basePath);

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
      <Box component="main" sx={{ overflow:'auto',flexGrow: 1, }}>
        <Toolbar />
        <Box mt={3} p={2}>
          <AppBreadCrumbs />
        </Box>
        <Divider sx={{ border: 1, borderColor: 'neutral.light' }} />
        {tabs.length > 0 && (
          <Box>
            <NavigationTabs  tabs={tabs} />
            
          <Divider sx={{ border: 1, borderColor: 'neutral.light', position: 'relative', top: '-0.4%', zIndex: '-100' }} />
          </Box>
        )}
        
        <Outlet />
      </Box>
    </Box>
  );
}

export default AppLayout;
