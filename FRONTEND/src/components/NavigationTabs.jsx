import React from 'react';
import { Tab, Tabs } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';

const NavigationTabs = ({ tabs, basePath }) => {
  const navigate = useNavigate();
  const location = useLocation();

  // Determine the index of the current tab based on the location
  const currentIndex = tabs.findIndex((path) => location.pathname.startsWith(`${basePath}${path}`));

  const handleChange = (event, newValue) => {
    navigate(`${basePath}${tabs[newValue]}`);
  };

  return (
    <Tabs
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
  );
};

export default NavigationTabs;
