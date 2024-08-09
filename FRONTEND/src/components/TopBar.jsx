import React from 'react';
import { AppBar, Toolbar, Typography, IconButton, Box, TextField ,InputAdornment} from '@mui/material';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import SearchIcon from '@mui/icons-material/Search';
import BorderBox from './BorderBox';


const TopBar = () => {
  return (
    <Box p={2} display={'flex'} alignItems={'center'} gap={1} borderBottom={1} paddingBlock={4}>
        <TextField sx={{maxWidth:'40%'}}fullWidth size='small' placeholder='Search for something' variant='outlined' InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}></TextField>
        <BorderBox radius={1} styles={{display:'flex',padding:1}}><NotificationsOutlinedIcon/></BorderBox>
    </Box>
  );
};

export default TopBar;
