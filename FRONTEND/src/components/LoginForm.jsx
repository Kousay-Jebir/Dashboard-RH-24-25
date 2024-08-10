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
        width: 330,
        height: 710,
        //padding: theme.spacing(3),
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
          marginBottom: theme.spacing(0),
          //marginTop: theme.spacing(-3),

        }}
      >
        HR Dashboard
      </Typography>
      <Typography
        variant="body2"
        component="h4"
        sx={{
          fontWeight: theme.typography.fontWeightLight,
          marginBottom: theme.spacing(10),
        }}
      >
        Junior Entreprise INSAT
      </Typography>
      <Box
        sx={{
          width: '330px',
          height: '320px',
          border: '0.1px solid Lightgrey',

          

          //padding: theme.spacing(1),
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          backgroundColor: theme.palette.background.default,
          top: '169px',
          padding: '18px 0px 0px 0px',
          gap: '40px',              // the gap between the elements
          borderRadius: '10px', 
        
        }}
        
      >
        <Typography
          variant="h5"
          component="h2"
          sx={{
            fontWeight: theme.typography.fontWeightBold,
            marginBottom: theme.spacing(-5),
            marginTop: theme.spacing(-1)
          }}
        >
          Login to your account
        </Typography>
        <Typography
            variant="body2"
            sx={{
                fontWeight: theme.typography.fontWeightLight,
                //marginBottom: theme.spacing(1),
                textAlign:'center',


            }}

            >
        Enter your login details to access to the dashboard
        </Typography>
        <TextField
          margin="none"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          autoFocus
          placeholder="Example@gmail.com"
          sx={{
            width: '320px',
            height: '20px',
            padding: '4px 8px',
            //gap: '6px',
            borderRadius: '5px 0px 0px 0px',
            //marginBottom: theme.spacing(4),

            
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
            width: '320px',
            height: '20px',
           padding: '4px 8px',
            //gap: '10px',
            borderRadius: '5px 0px 0px 0px',
            //marginBottom: theme.spacing(6),

           
          }}
          
    
        />
       <Button
            type="submit"
            
            variant="contained"
            color="primary"
            sx={{
                width: '305px',
                height: '35px',
                padding: '4px 8px',
                gap: '10px',
                borderRadius: '5px',
                //marginTop:theme.spacing(1),
                marginBottom: theme.spacing(4),

            
            }}
            >
            Login
        </Button>

      </Box>
      <Typography
        variant="body2"
        color="textSecondary"
        textAlign="center"
        sx={{ marginTop: theme.spacing(7),
            

            fontWeight: theme.typography.fontWeightLight,

            
         }}
      >
        2024 © HR Management By Junior Entreprise INSAT
      </Typography>
    </Box>
  );
};

export default LoginForm;
