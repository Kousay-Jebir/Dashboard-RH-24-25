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