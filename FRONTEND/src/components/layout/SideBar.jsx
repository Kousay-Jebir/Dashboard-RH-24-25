/* import React, { useState } from 'react';
import { List, ListItem, ListItemIcon, ListItemText, Box, Typography } from '@mui/material';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import AssessmentOutlinedIcon from '@mui/icons-material/AssessmentOutlined';
import { useLocation, useNavigate } from 'react-router-dom';
import AppName from './AppName';
import { useTheme } from '@emotion/react';

const SideBar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const theme = useTheme();
  const menuItems = [
    { text: 'Dashboard', icon: <DashboardOutlinedIcon />, path: '/test1' },
    { text: 'Recruitment', icon: <GroupOutlinedIcon />, path: '/test2' },
    { text: 'Team members', icon: <GroupOutlinedIcon />, path: '/team-members' },
    { text: 'Meetings', icon: <CalendarTodayOutlinedIcon />, path: '/meetings' },
    { text: 'Evaluation', icon: <AssessmentOutlinedIcon />, path: '/evaluation' },
  ];

  return (
    <Box>
      <AppName />
      <Box p={3}>
        <Typography>General</Typography>
        <List sx={{ padding: 0 }}> 
          {menuItems.map((item, index) => (
            <ListItem
              key={item.text}
              onClick={() => navigate(item.path)} 
              sx={{
                backgroundColor: location.pathname === item.path ? 'rgba(0, 0, 0, 0.08)' : 'transparent',
                '&:hover': {
                  backgroundColor: 'rgba(0, 0, 0, 0.12)',
                },
                cursor: 'pointer',
                borderRadius: 1,
                padding:0.5,
                marginBottom:1
              }}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
      </Box>
    </Box>  const location = useLocation();
  const navigate = useNavigate();
  );
};
() => navigateult SideBar;
 */


import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import {List, ListItem, ListItemIcon, ListItemText} from '@mui/material'
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import AssessmentOutlinedIcon from '@mui/icons-material/AssessmentOutlined';
import { Toolbar,Avatar,Typography,Divider } from '@mui/material';
import { useLocation,useNavigate } from 'react-router-dom';

export default function SideBar({drawerWidth,mobileOpen,handleDrawerClose,handleDrawerTransitionEnd,}){

  const location = useLocation();
  const navigate = useNavigate();


  const menuItems = [
    { text: 'Dashboard', icon: <DashboardOutlinedIcon />, path: '/test1' },
    { text: 'Recruitment', icon: <GroupOutlinedIcon />, path: '/test2' },
    { text: 'Team members', icon: <GroupOutlinedIcon />, path: '/team-members' },
    { text: 'Meetings', icon: <CalendarTodayOutlinedIcon />, path: '/meetings' },
    { text: 'Evaluation', icon: <AssessmentOutlinedIcon />, path: '/evaluation' },
  ];
  const drawer = (
    <Box>
      <Toolbar sx={{gap:2,p:2}}>
        <Avatar src='/src/assets/JEI.png' sx={{border:1,borderColor:'neutral.light',height:54,width:54}}></Avatar>
        <Box>
          <Typography variant='subtitle1' fontWeight={'regular'}>Junior Entreprise INSAT</Typography>
          <Typography variant='subtitle2' color={'text.secondary'}>HR Management</Typography>
        </Box>
      </Toolbar>
      <Divider sx={{border:1,borderColor:'neutral.light'}}/>
      <Box p={2}>
        <Typography paddingBlockEnd={3} color={'text.secondary'}>General</Typography>
        <List sx={{ padding: 0 }}> 
          {menuItems.map((item, index) => (
            <ListItem
              key={item.text}
              onClick={() => navigate(item.path)} 
              sx={{
                backgroundColor: location.pathname === item.path ? 'neutral.light' : 'transparent',
                '&:hover': {
                  backgroundColor: 'neutral.light',
                },
                cursor: 'pointer',
                borderRadius: 1,
                padding:0.5,
                marginBottom:1
              }}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
      </Box>
     
    </Box>
  );
  return(
    <Box
          component="nav"
          sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
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
              display: { xs: 'block', sm: 'none' },
              '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth
                ,borderRight:1,
              borderColor:'neutral.light'
              },
            borderRight: '2px solid #1976d2'
            }}
          >
            {drawer}
          </Drawer>
          <Drawer
            variant="permanent"
            sx={{
              display: { xs: 'none', sm: 'block' },
              '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth 
                ,borderRight:2,
              borderColor:'neutral.light'
              },
            }}
            open
          >
            {drawer}
          </Drawer>
        </Box>
  )
}