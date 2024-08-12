import { Button } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import React from 'react';

const ScheduleButton = ({
  title = '+ Schedule interview',
  theme = 'blue', 
  onClick,
}) => {
  const muiTheme = useTheme();

  const buttonStyles = {
    white: {
      backgroundColor: '#ffffff',
      color: muiTheme.palette.blue.main, 
      border: 'none',
    },
    blue: {
      backgroundColor: muiTheme.palette.blue.main,
      color: '#ffffff',
      border: `1px solid ${muiTheme.palette.blue.main}`,
    },
  };

  return (
    <Button
      sx={{
        display: 'flex',
        alignItems: 'center', 
        justifyContent: 'center', 
        fontSize:'10px',
        width: '175px',
        height: '30px',
        padding: '6px 10px',
        borderRadius: '5px 5px 5px 5px',
        ...buttonStyles[theme],
      }}
      onClick={onClick}
    >
    
      {title}
    </Button>
  );
};

export default ScheduleButton;
