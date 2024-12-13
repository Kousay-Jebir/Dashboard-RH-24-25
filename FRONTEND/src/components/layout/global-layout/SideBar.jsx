import * as React from 'react';
import Drawer from '@mui/material/Drawer';
import { List, ListItem, ListItemIcon, ListItemText,Box } from '@mui/material';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import AssessmentOutlinedIcon from '@mui/icons-material/AssessmentOutlined';
import { Toolbar, Avatar, Typography, Divider } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import jeiAvatar from "../../../assets/JEI.png"
// Function to check if the current path is a nested route of the item path
const isActivePath = (currentPath, itemPath) => {
  return currentPath === itemPath || currentPath.startsWith(itemPath + '/');
};

export default function SideBar({
  drawerWidth,
  mobileOpen,
  handleDrawerClose,
  handleDrawerTransitionEnd,
}) {
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = [
    { text: 'Dashboard', icon: <DashboardOutlinedIcon />, path: '/dashboard',defaultLocation:'' },
    { text: 'Recruitement', icon: <GroupOutlinedIcon />, path: '/recruitement' ,defaultLocation:'/interviews/recent'},
    { text: 'Team members', icon: <GroupOutlinedIcon />, path: '/team-members' ,defaultLocation:'/all'},
    { text: 'Meetings', icon: <CalendarTodayOutlinedIcon />, path: '/meetings' ,defaultLocation:'/meetings/recent'},
    { text: 'Evaluation', icon: <AssessmentOutlinedIcon />, path: '/evaluation' ,defaultLocation:''},
  ];

  const drawerContent = (
    <Box>
      <Toolbar sx={{ gap: 2, p: 2 }}>
        <Avatar src={jeiAvatar} sx={{ border: 1, borderColor: 'neutral.light', height: 54, width: 54 }} />
        <Box>
          <Typography variant='subtitle1' fontWeight={'regular'}>Junior Entreprise INSAT</Typography>
          <Typography variant='subtitle2' color={'text.secondary'}>HR Management</Typography>
        </Box>
      </Toolbar>
      <Divider sx={{ border: 1, borderColor: 'neutral.light' }} />
      <Box p={2}>
        <Typography paddingBlockEnd={3} color={'text.secondary'}>General</Typography>
        <List sx={{ padding: 0 }}>
          {menuItems.map((item) => (
            <ListItem
              key={item.text}
              onClick={() => navigate(item.path+item.defaultLocation)}
              sx={{
                backgroundColor: isActivePath(location.pathname, item.path) ? 'neutral.light' : 'transparent',
                '&:hover': {
                  backgroundColor: 'neutral.light',
                },
                cursor: 'pointer',
                borderRadius: 1,
                padding: 0.5,
                marginBottom: 1
              }}
            >
              <ListItemIcon>
                {React.cloneElement(item.icon, {
                  color: isActivePath(location.pathname, item.path) ? 'neutral' : 'neutral.light'
                })}
              </ListItemIcon>
              <ListItemText
                primary={item.text}
                sx={{ color: isActivePath(location.pathname, item.path) ? 'neutral' : 'text.secondary' }}
              />
            </ListItem>
          ))}
        </List>
      </Box>
    </Box>
  );

  return (
    <Box
      component="nav"
      sx={{ width: { lg: drawerWidth }, flexShrink: { lg: 0 } }}
      aria-label="mailbox folders"
    >
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onTransitionEnd={handleDrawerTransitionEnd}
        onClose={handleDrawerClose}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: 'block', lg: 'none' }, // Show temporary drawer on large screens and below
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, borderRight: 1, borderColor: 'neutral.light' },
          borderRight: '2px solid #1976d2'
        }}
      >
        {drawerContent}
      </Drawer>
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', lg: 'block' }, // Show permanent drawer on screens larger than large
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, borderRight: 2, borderColor: 'neutral.light' },
        }}
        open
      >
        {drawerContent}
      </Drawer>
    </Box>
  );
}
