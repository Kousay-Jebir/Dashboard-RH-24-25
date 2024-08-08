import React, { useState } from 'react';
import { List, ListItem, ListItemIcon, ListItemText, Box, Typography } from '@mui/material';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import AssessmentOutlinedIcon from '@mui/icons-material/AssessmentOutlined';
import AppName from './AppName';

const SideBar = () => {
  const [activeIndex, setActiveIndex] = useState(0); // Track active menu item

  const menuItems = [
    { text: 'Dashboard', icon: <DashboardOutlinedIcon /> },
    { text: 'Recruitment', icon: <GroupOutlinedIcon /> },
    { text: 'Team members', icon: <GroupOutlinedIcon /> },
    { text: 'Meetings', icon: <CalendarTodayOutlinedIcon /> },
    { text: 'Evaluation', icon: <AssessmentOutlinedIcon /> },
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
                onClick={() => setActiveIndex(index)} // Update active index on click
                sx={{
                  backgroundColor: activeIndex === index ? 'rgba(0, 0, 0, 0.08)' : 'transparent',
                  '&:hover': {
                    backgroundColor: 'rgba(0, 0, 0, 0.12)',
                  },
                  cursor: 'pointer',
                  borderRadius:1
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
