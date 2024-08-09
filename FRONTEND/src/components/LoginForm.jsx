import { Box, Button, TextField, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import React from 'react';

const LoginForm = () => {
  const theme = useTheme();

  const handleSubmit = (event) => {
    event.preventDefault();
    //  form submission here
  };

  return (
    <Box
      sx={{
        width: 388,
        height: 710,
        padding: theme.spacing(3),
       backgroundColor: theme.palette.background.paper,

        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        //boxShadow:1 ,
        
      }}
    >
      <Typography
        variant="h5"
        component="h1"
        sx={{
          fontWeight: theme.typography.fontWeightBold,
          marginBottom: theme.spacing(1),
        }}
      >
        HR Dashboard
      </Typography>
      <Typography
        variant="body2"
        component="h4"
        sx={{
          fontWeight: theme.typography.fontWeightLight,
          marginBottom: theme.spacing(6),
        }}
      >
        Junior Entreprise INSAT
      </Typography>
      <Box
        sx={{
          width: 388,
          height: 327,
          border: '3px',
          borderColor: 'black',

          padding: theme.spacing(2),
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          backgroundColor: theme.palette.background.default,
        
        }}
      >
        <Typography
          variant="h5"
          component="h2"
          sx={{
            fontWeight: theme.typography.fontWeightBold,
            marginBottom: theme.spacing(2),
          }}
        >
          Login to your account
        </Typography>
        <Typography
            variant="body2"
            sx={{
                fontWeight: theme.typography.fontWeightLight,
                marginBottom: theme.spacing(4),


            }}

            >
        Enter your login details to access to the dashboard
        </Typography>
        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          autoFocus
          placeholder="Example@gmail.com"
          sx={{
            width: '352px',
            height: '31px',
            padding: '8px 12px',
            gap: '6px',
            borderRadius: '5px 0px 0px 0px',
            marginBottom: theme.spacing(3),

            
          }}
          
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
          placeholder="*************"
          sx={{
            width: '352px',
            height: '31px',
            padding: '8px 12px',
            gap: '10px',
            borderRadius: '5px 0px 0px 0px',
            marginBottom: theme.spacing(5),

           
          }}
          
    
        />
       <Button
            type="submit"
            
            variant="contained"
            color="primary"
            sx={{
                width: '330px',
                //height: '33px',
                padding: '10px 12px',
                gap: '10px',
                borderRadius: '5px',
                marginTop:theme.spacing(1),
                marginBottom: theme.spacing(3),

            
            }}
            >
            Login
        </Button>

      </Box>
      <Typography
        variant="body2"
        color="textSecondary"
        textAlign="center"
        sx={{ marginTop: theme.spacing(6),
            fontWeight: theme.typography.fontWeightLight,

            
         }}
      >
        2024 © HR Management By Junior Entreprise INSAT
      </Typography>
    </Box>
  );
};

export default LoginForm;
