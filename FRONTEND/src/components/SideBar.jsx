import React, { useState } from 'react';
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
        <List sx={{ padding: 0 }}> {/* Remove padding from List */}
          {menuItems.map((item, index) => (
            <ListItem
              key={item.text}
              onClick={() => navigate(item.path)} // Navigate to the path
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
    </Box>
  );
};

export default SideBar;
