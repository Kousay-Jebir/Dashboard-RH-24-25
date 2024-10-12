import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import { Box, Button, InputAdornment, TextField, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import BorderBox from './BorderBox';
import MailOutlineRoundedIcon from '@mui/icons-material/MailOutlineRounded';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

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

const InputField = ({ icon, placeholder, type, label, value, setValue, error }) => {
  return (
      <>
          <Typography sx={{
              '&::after': {
                  content: '"*"',
                  color: '#3559E9'
              },
              fontWeight: 'medium',
              marginBottom: 1
          }}>{label}</Typography>
          <TextField
              type={type}
              fullWidth
              size='small'
              placeholder={placeholder}
              InputProps={{
                  startAdornment: (
                      <InputAdornment position="start">
                          {icon}
                      </InputAdornment>
                  ),
              }}
              error={!!error}
              value={value}
              onChange={setValue}
              sx={{
                  '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                  },
                  mb: 2
              }}
              required
          />
          {error && <Typography color="error">{error}</Typography>}
      </>
  );
};

const LoginForm = ({ handleSubmit, formData, setFormData, error,setError }) => {
  return (
      <BorderBox radius={1.5} styles={{ padding: 2 }}>
          <Box textAlign='center' mb={5}>
              <Typography variant='h6'>Login to your account</Typography>
              <Typography color='text.light'>Enter your login details to access the dashboard</Typography>
          </Box>
          <form onSubmit={handleSubmit}>
              <InputField
                  type='email'
                  icon={<MailOutlineRoundedIcon fontSize='small' />}
                  placeholder="example@gmail.com"
                  label="Email Address"
                  value={formData.email}
                  setValue={(e) => setFormData({ ...formData, email: e.target.value })}
                  error={error}
              />
              <InputField
                  type='password'
                  icon={<LockOutlinedIcon fontSize='small' />}
                  placeholder="*******"
                  label="Password"
                  value={formData.password}
                  setValue={(e) => setFormData({ ...formData, password: e.target.value })}
                  error={error}
              />
              <Button type='submit' variant='contained' sx={{ textTransform: 'none', marginTop: 3 }} disableElevation fullWidth>Login</Button>
          </form>
      </BorderBox>
  );
};

export default LoginForm;