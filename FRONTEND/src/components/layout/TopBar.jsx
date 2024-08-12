/* import React from 'react';
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
 */



// TopBar.js
import { AppBar,Toolbar,Typography,IconButton,TextField,InputAdornment} from "@mui/material"
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import SearchIcon from '@mui/icons-material/Search';
import BorderBox from "../BorderBox";
export default function TopBar({handleDrawerToggle,drawerWidth}){
  return(
    <AppBar
        position="fixed"
        elevation={0}
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          backgroundColor:'background.default',
          borderBottom:2,
          borderColor:'neutral.light'
        }}
      >
        <Toolbar sx={{gap:1,p:2.64}}>
          <IconButton
            
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>

          <TextField sx={{maxWidth:'40%'}}fullWidth size='small' placeholder='Search for something' variant='outlined' InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}></TextField>

        <BorderBox radius={2} styles={{display:'flex',padding:1}}><NotificationsOutlinedIcon color="neutral"/></BorderBox>
          
        </Toolbar>
      </AppBar>
  )
}
