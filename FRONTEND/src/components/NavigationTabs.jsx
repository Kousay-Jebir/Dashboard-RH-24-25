import React from 'react';
import { Box, Tab, Tabs } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import Schedule from './Schedule';
const NavigationTabs = ({ tabs, basePath }) => {
  const navigate = useNavigate();
  const location = useLocation();

  function renderScheduleButton() {
    if(location.pathname.startsWith('/recruitement')){
      return <Schedule schedule={'interview'}/>
    }
    else if(location.pathname.startsWith('/meetings')) {
      return <Schedule schedule={'meeting'}/>
    }
  }



  // Determine the index of the current tab based on the location
  const currentIndex = tabs.findIndex((path) => location.pathname.startsWith(`${basePath}${path}`));

  const handleChange = (event, newValue) => {
    navigate(`${basePath}${tabs[newValue]}`);
  };

  return (
    <Box p={1} pr={2} display='flex' alignItems='center' justifyContent={'space-between'} flexWrap={'wrap'} gap={1}><Tabs
      value={currentIndex !== -1 ? currentIndex : false}
      onChange={handleChange}
      aria-label="navigation tabs"
      textColor='text.primary'
      indicatorColor='secondary'
    >
      {tabs.map((path, index) => (
        <Tab key={path} label={path.slice(1)} sx={{ textTransform: 'capitalize' }} />
      ))}
    </Tabs>
    {renderScheduleButton()}
    </Box>
  );
};

export default NavigationTabs;
