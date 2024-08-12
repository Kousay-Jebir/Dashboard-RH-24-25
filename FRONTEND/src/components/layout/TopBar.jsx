import * as React from 'react';
import { AppBar, Toolbar, Typography, IconButton, TextField, InputAdornment } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import SearchIcon from '@mui/icons-material/Search';
import BorderBox from '../BorderBox';

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

        <TextField
          sx={{ maxWidth: '40%' }}
          fullWidth
          size="small"
          placeholder="Search for something"
          variant="outlined"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />

        <BorderBox radius={2} styles={{ display: 'flex', padding: 1 }}>
          <NotificationsOutlinedIcon color="neutral" />
        </BorderBox>
      </Toolbar>
    </AppBar>
  );
}
