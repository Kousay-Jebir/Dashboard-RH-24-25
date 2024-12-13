import * as React from 'react';
import { AppBar, Toolbar, Typography, IconButton, TextField, InputAdornment } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';import BorderBox from '../../BorderBox';
import SearchBar from '../../SearchBar';
import Cookies from 'js-cookie';

export default function TopBar({ handleDrawerToggle, drawerWidth }) {
  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        width: { lg: `calc(100% - ${drawerWidth}px)`, xs: '100%' }, // Adjust width for large and below screens
        ml: { lg: `${drawerWidth}px`, xs: 0 }, // Margin-left for large and below screens
        backgroundColor: 'background.default',
        borderBottom: 2,
        borderColor: 'neutral.light',
      }}
    >
      <Toolbar sx={{ gap: 1, p: 2.64 }}>
        <IconButton
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{ mr: 2, display: { lg: 'none' } }} // Show menu icon only on large screens and below
        >
          <MenuIcon />
        </IconButton>

        <SearchBar placeHolder={'Search for something'}/>

        <BorderBox radius={2} styles={{ display: 'flex', padding: 1 }}>
          <IconButton
            onClick={() => {
              Cookies.remove('accessToken');
              window.location.reload(); // Refresh the page
            }}
            sx={{ p:0 , m:0}}
          >
            <LogoutIcon fontSize='medium' sx={{color:'text.secondary'}} />
          </IconButton>
        </BorderBox>
      </Toolbar>
    </AppBar>
  );
}
