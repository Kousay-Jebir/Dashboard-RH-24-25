import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import { Box, Button, InputAdornment, TextField, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const LoginForm = () => {
  const theme = useTheme();
  const { login } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [errors, setErrors] = useState({});

  
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const validateForm = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // validate email
   if (!emailRegex.test(formData.email.trim())) {
      newErrors.email = "Please respect the format of the E-mail adress.";
    }

    // validate password
    if (formData.password.length < 6) {
      newErrors.password = "The password must be at least 6 characters long.";
    }
    else  if (formData.password.length > 20) {
      newErrors.password = "The password is too long.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validateForm()) {
      console.log("form data", formData);
      const loginData = {
        email:formData.email,
        password:formData.password
      };
  
      try {
        const response = await axios.post(
          "http://localhost:5000/superadmin/login",
          loginData
        );
        console.log(response)
        if (response.data.access_token) {
          console.log("we have")
          login(response.data.access_token);
          navigate("/dashboard");
        }
      } catch (error) {
        console.error("Login failed:", error.response || error.message);
      }
    }
  };

  const typographyStyle = {
    fontFamily: theme.typography.fontFamily,
    fontSize: theme.typography.fontSize,
    fontWeight: theme.typography.fontWeightRegular,
    textAlign: 'left',
  };

  const textFieldStyle = {
    height: '31px',
    width: '352px',
    borderRadius: '5px',
    '& .MuiInputBase-root': {
      height: '100%',
    },
    '& .MuiInputBase-input': {
      fontFamily: theme.typography.fontFamily,
      fontSize: theme.typography.fontSize,
    },
    '& .MuiFormLabel-root': typographyStyle,
    '& input:-webkit-autofill': {
      WebkitBoxShadow: '0 0 0 1000px white inset',
      WebkitTextFillColor: 'black',
      fontFamily: theme.typography.fontFamily,
      transition: 'background-color 5000s ease-in-out 0s',
    },
  };

  return (
    <Box
      sx={{
        width: 388,
        height: 710,
        top: 107,
        left: 153,
        backgroundColor: theme.palette.background.paper,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
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
        }}
      >
        <Typography
          variant="h5"
          component="h1"
          sx={{
            fontFamily: theme.typography.fontFamily,
            fontSize: '19.83px',
            fontWeight: 600,
            lineHeight: '23.99px',
            textAlign: 'center',
          }}
        >
          HR Dashboard
        </Typography>
        <Typography
          variant="body2"
          component="h4"
          sx={{
            ...typographyStyle,
            fontSize: '15px',
            textAlign: 'center',
            color: theme.palette.secondary.main,
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
          padding: '18px',
          gap: '42px',
          borderRadius: '5px 0px 0px 0px',
          border: '1px solid Lightgrey',
          backgroundColor: theme.palette.background.default,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Box
          sx={{
            width: 352,
            height: '48px',
            display: 'flex',
            flexDirection: 'column',
            gap: '6px',
          }}
        >
          <Typography
            variant="h5"
            component="h2"
            sx={{
              fontSize: '19.83px',
              fontWeight: 600,
              lineHeight: '23.99px',
              textAlign: 'center',
            }}
          >
            Login to your account
          </Typography>
          <Typography
            variant="body2"
            sx={{
              ...typographyStyle,
              textAlign: 'center',
              color: theme.palette.secondary.main,
            }}
          >
            Enter your login details to access the dashboard
          </Typography>
        </Box>

        <Box
          sx={{
            width: '352px',
            height: '124px',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
          }}
        >
          <Box
            sx={{
              width: 352,
              height: 56,
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
            }}
          >
            <Typography variant="body2" sx={typographyStyle}>
              Email Address
            </Typography>
            <TextField
              margin="none"
              required
              fullWidth
              id="email"
              name="email"
              autoComplete="email"
              autoFocus
              placeholder="Example@gmail.com"
              sx={textFieldStyle}
              value={formData.email}
              onChange={handleChange}
              error={!!errors.email}
              helperText={errors.email}
              FormHelperTextProps={{
                sx: {
                    fontFamily: theme.typography.fontFamily,
                    fontSize: '10px',
                    lineHeight: '12.1px',
                    marginTop: '5px',
                    textAlign: 'center'
                    //marginBottom: '1px',
                    

                }
            }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailIcon sx={{ fontSize: 12 }} />
                  </InputAdornment>
                ),
              }}
            />
          </Box>

          <Typography variant="body2" sx={typographyStyle}>
            Password
          </Typography>
          <TextField
            margin="none"
            required
            fullWidth
            name="password"
            type="password"
            id="password"
            autoComplete="current-password"
            placeholder="*************"
            sx={textFieldStyle}
            value={formData.password}
            onChange={handleChange}
            error={!!errors.password}
            helperText={errors.password}
            FormHelperTextProps={{
              sx: {
                  fontFamily: theme.typography.fontFamily,
                  fontSize: '10px',
                  lineHeight: '12.1px',
                  marginTop: '5px',
                  textAlign: 'center'

                  //marginBottom: '1px',
                  

              }
          }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockIcon sx={{ fontSize: 12 }} />
                </InputAdornment>
              ),
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
          }}
        >
          Login
        </Button>
      </Box>

      <Typography
        variant="body2"
        textAlign="center"
        sx={{
          position: 'absolute',
          bottom: '20px',
          width: 302,
          height: '15px',
          ...typographyStyle,
          fontSize: '12px',
          lineHeight: '14.52px',
          color: theme.palette.secondary.main,
        }}
      >
        2024 © HR Management By Junior Entreprise INSAT
      </Typography>
    </Box>
  );
};

export default LoginForm;
