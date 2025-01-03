import React from 'react';
import { Box, Tab, Tabs } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import ScheduleButton from '../Components/ScheduleButton';

const NavigationTabs = ({tabs,button}) => {
  const navigate = useNavigate();
  const location = useLocation();
  console.log('info')
  console.log(tabs)
  // Determine the index of the current tab based on the location
  const currentIndex = tabs.findIndex((tab) =>{
    console.log('testing');

    return location.pathname.startsWith(tab.path)
  }
  );

  const handleChange = (event, newValue) => {
    navigate(`${tabs[newValue].path}${tabs[newValue].default}`);
  };

  /* function renderScheduleButton() {
    if (location.pathname.startsWith('/recruitement')) {
      return <ScheduleButton schedule={'Schedule interview'} />;
    } else if (location.pathname.startsWith('/meetings')) {
      return <ScheduleButton schedule={'Schedule meeting'} />;
    }
    return null; // Ensure there's a return value for all cases
  } */

  return (
    <Box
      p={1}
      pr={2}
      display='flex'
      alignItems='center'
      justifyContent='space-between'
      flexWrap='wrap'
      gap={1}
      sx={{
        
      }}
    >
      <Tabs
        value={currentIndex !== -1 ? currentIndex : false}
        onChange={handleChange}
        aria-label="navigation tabs"
        textColor='text.primary'
        indicatorColor='secondary'
        sx={{
          overflow: { xs: 'auto', sm:'scroll', md: 'visible' }, // Ensure overflow is not hidden
          '.MuiTabs-indicator': {
            bottom: -10, // Adjust this value to push down the indicator
            display: { xs: 'none', md: 'block' }, // Hide indicator on extra-small screens
          },
          '.MuiTabs-root': {
            overflow: 'visible !important',
          },
          '.MuiTabs-scroller': {
            overflow: 'visible !important',
          },
          '.MuiTabs-fixed': {
            overflow: 'visible !important',
          },
        }}
      >
        {tabs.map((tab, index) => (
          <Tab
            key={tab.path} // Use tab.path as key for better uniqueness
            label={tab.title} // Use tab.title for the tab label
            sx={{ textTransform: 'none' }}
          />
        ))}
      </Tabs>
      {button}
    </Box>
  );
};

export default NavigationTabs;
