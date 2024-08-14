import { Box, Button, TextField, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import React from 'react';

const LoginForm = () => {
  const theme = useTheme();

  const handleSubmit = (event) => {
    event.preventDefault();
    // Form submission logic here
  };

  return (
    <Box
      sx={{
        width: 388,
        height: 710,
        //position: 'absolute',
        top: 107,
        left: 153,
        backgroundColor: theme.palette.background.paper,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        opacity: 1, // Ensure visibility
      }}
    >
      <Box
        sx={{
          width: '155px',
          height: '50px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '8px',
          opacity: 1, // Ensure visibility
        }}
      >
        <Typography
          variant="h5"
          component="h1"
          sx={{
            fontFamily: 'Inter Display',
            fontSize: '19.83px',
            fontWeight: 500,
            lineHeight: '23.99px',
            textAlign: 'center',
            opacity: 1, // Ensure visibility
          }}
        >
          HR Dashboard
        </Typography>
        <Typography
          variant="body2"
          component="h4"
          sx={{
            fontFamily: 'Inter Display',
            fontSize: '15px',
            fontWeight: 400,
            lineHeight: '18.15px',
            textAlign: 'center',
            opacity: 1, // Ensure visibility
          }}
        >
          Junior Entreprise INSAT
        </Typography>
      </Box>

      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          width: 388,
          height: 327,
          position: 'absolute',
          top: 169,
          padding: '18px 0px 0px 0px',
          gap: '42px',
          borderRadius: '5px 0px 0px 0px',
          border: '1px solid Lightgrey',
          backgroundColor: theme.palette.background.default,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          opacity: 1, // Ensure visibility
        }}
      >
        <Box
          sx={{
            width: 352,
            height: '48px',
            display: 'flex',
            flexDirection: 'column',
            gap: '6px',
            opacity: 1, // Ensure visibility
          }}
        >
          <Typography
            variant="h5"
            component="h2"
            sx={{
              fontFamily: 'Inter Display',
              fontSize: '19.83px',
              fontWeight: 500,
              lineHeight: '23.99px',
              textAlign: 'center',
              opacity: 1, // Ensure visibility
            }}
          >
            Login to your account
          </Typography>
          <Typography
            variant="body2"
            sx={{
              fontFamily: 'Inter',
              fontSize: '14px',
              fontWeight: 400,
              lineHeight: '16.94px',
              textAlign: 'center',
            }}
          >
            Enter your login details to access the dashboard
          </Typography>
        </Box>

        <Box
          sx={{
            width: 352,
            height: 124,
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            opacity: 1, // Ensure visibility
          }}
        >
          <TextField
            margin="none"
            required
            fullWidth
            id="email"
            name="email"
            autoComplete="email"
            autoFocus
            placeholder="Example@gmail.com"
            sx={{
              height: '40px',
              padding: '10px',
              borderRadius: '5px',
              '& .MuiInputBase-input': {
                fontFamily: 'Inter',
                fontSize: '14px',
              },
            }}
          />
          <TextField
            margin="none"
            required
            fullWidth
            name="password"
            type="password"
            id="password"
            autoComplete="current-password"
            placeholder="*************"
            sx={{
              height: '40px',
              padding: '10px',
              borderRadius: '5px',
              '& .MuiInputBase-input': {
                fontFamily: 'Inter',
                fontSize: '14px',
              },
            }}
          />
        </Box>

        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{
            width: 352,
            height: 35,
            padding: '10px 12px',
            borderRadius: '5px',
            opacity: 1, // Ensure visibility
          }}
        >
          Login
        </Button>
      </Box>

      <Typography
        variant="body2"
        color="textSecondary"
        textAlign="center"
        sx={{
          position: 'absolute',
          bottom: '20px',
          width: 302,
          height: '15px',
          fontFamily: 'Inter',
          fontSize: '12px',
          fontWeight: 400,
          lineHeight: '14.52px',
          textAlign: 'center',
          opacity: 1, // Ensure visibility
        }}
      >
        2024 © HR Management By Junior Entreprise INSAT
      </Typography>
    </Box>
  );
};

export default LoginForm;
