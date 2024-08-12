import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Avatar } from '@mui/material';
import TopBar from './TopBar';
import SideBar from './SideBar';
import { Outlet } from 'react-router-dom';
import AppBreadCrumbs from './AppBreadCrumbs';

const drawerWidth = 340;

function AppLayout() {
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

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <TopBar handleDrawerToggle={handleDrawerToggle} drawerWidth={drawerWidth}/>
      <SideBar drawerWidth={drawerWidth}mobileOpen={mobileOpen}handleDrawerClose={handleDrawerClose}handleDrawerTransitionEnd={handleDrawerTransitionEnd}/>
      <Box
        component="main"
        sx={{ flexGrow: 1, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      >
        <Toolbar/>
        <Box mt={3} p={2}>
          <AppBreadCrumbs/>
        </Box>
        <Divider sx={{border:1,borderColor:'neutral.light'}}/>
        
        <Outlet></Outlet>
      </Box>
    </Box>
  );
}

export default AppLayout;
