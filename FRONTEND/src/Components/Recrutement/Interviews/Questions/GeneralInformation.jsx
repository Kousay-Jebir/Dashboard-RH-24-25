import {
  Email as EmailIcon,
  Person as PersonIcon,
  Phone as PhoneIcon,
  School as SchoolIcon,
} from '@mui/icons-material';
import {
  Box,
  FormControl,
  FormControlLabel,
  InputAdornment,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import React from 'react';

const GeneralInformation = () => {
  const theme = useTheme();

  const renderTextField = (label, width, placeholder, icon) => (
    <Box sx={{ width: width, display: 'flex', flexDirection: 'column', gap: '8px' }}>
      <Typography
        variant="body2"
        sx={{
          fontFamily: theme.typography.fontFamily,
          fontSize: '14px',
          fontWeight: theme.typography.regular,
          lineHeight: '16.94px',
          textAlign: 'left',
        }}
      >
        {label}
      </Typography>
      <TextField
        placeholder={placeholder}
        sx={{
          height: '41px',
          '& .MuiInputBase-root': { height: '100%' },
          '& .MuiInputBase-input': { fontFamily: theme.typography.fontFamily, fontSize: '12px' },
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              {icon}
            </InputAdornment>
          ),
        }}
      />
    </Box>
  );
  const CustomSelect = ({ label, placeholder, options, icon }) => (
    <Box sx={{ width: '250px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
      <Typography
        variant="body2"
        sx={{
          fontFamily: theme.typography.fontFamily,
          fontSize: '14px',
          fontWeight: theme.typography.regular,
          lineHeight: '16.94px',
          textAlign: 'left',
        }}
      >
        {label}
      </Typography>
      <Select
        displayEmpty
        sx={{
          height: '41px',
          '& .MuiInputBase-root': { height: '100%' },
          '& .MuiInputBase-input': { fontFamily: theme.typography.fontFamily, fontSize: '12px' },
        }}
        startAdornment={
          <InputAdornment position="start">
            {icon}
          </InputAdornment>
        }
      >
        <MenuItem value="" disabled>
          {placeholder}
        </MenuItem>
        {options.map((option, index) => (
          <MenuItem key={index} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </Box>
  );
  
  
  
  
  return (
    <Box
      sx={{
        width: '827px',
        height: '315px',
        padding: '10px',
        gap: '14px',
        display: 'flex',
        flexDirection: 'column',
        opacity: 1,
        border: `1px solid ${theme.palette.neutral.light}`,
      }}
    >
      <Typography
        variant="h6"
        sx={{
          fontFamily: theme.typography.fontFamily,
          fontSize: '16px',
          fontWeight: theme.typography.medium,
          lineHeight: '19.36px',
          textAlign: 'left',
        }}
      >
        General Information
      </Typography>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: '14px' }}>
        {renderTextField('Name',230, "Enter the candidate's name", <PersonIcon />)}
        {renderTextField('Last name',250, "Enter the candidate's last name", <PersonIcon />)}
        {renderTextField('Email Address',290, "Enter the candidate's email address", <EmailIcon />)}
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: '14px' }}>
        {renderTextField('Phone number', 230 ,'+216', <PhoneIcon />)}
        <FormControl component="fieldset" sx={{ width: '560px', gap: '5px' }}>
          <Typography
            variant="subtitle1"
            sx={{
              fontFamily: theme.typography.fontFamily,
              fontSize: '14px',
              fontWeight: theme.typography.regular,
              lineHeight: '16.94px',
              textAlign: 'left',
            }}
          >
            Department
          </Typography>
          <RadioGroup
            aria-label="department"
            name="department"
            defaultValue="projects"
            sx={{ display: 'flex', flexDirection: 'row', gap: '8px' }}
          >
            {['Projects', 'Development Commercial', 'Cellule Qualité', 'Marketing'].map((dept) => (
              <FormControlLabel
                key={dept}
                value={dept.toLowerCase().replace(' ', '_')}
                control={<Radio sx={{ '&.Mui-checked': { color: '#3559E9' } }} />}
                label={
                  <Typography
                    sx={{
                      fontFamily: theme.typography.fontFamily,
                      fontSize: '12px',
                      fontWeight: theme.typography.regular,
                      lineHeight: '14.52px',
                      textAlign: 'center',
                    }}
                  >
                    {dept}
                  </Typography>
                }
              />
            ))}
          </RadioGroup>
        </FormControl>
      </Box>

      <Box sx={{ display: 'flex', gap: '14px' }}>
    <CustomSelect
      label="Field"
      placeholder="Select the candidate's field"
      options={[
        { value: 'MPI', label: 'MPI' },
        { value: 'CBA', label: 'CBA' },
        { value: 'RT', label: 'RT' },
        { value: 'IIA', label: 'IIA' },
        { value: 'GL', label: 'GL' },
        { value: 'IMI', label: 'IMI' },
        { value: 'CH', label: 'CH' },
        { value: 'BIO', label: 'BIO' },

        
      ]}
      icon={<SchoolIcon />}
    />
    <CustomSelect
      label="Academic year"
      placeholder="Select the candidate's academic year"
      options={[
        { value: 1, label: '1st year' },
        { value: 2, label: '2nd year' },
        { value: 3, label: '3rd year' },
        { value: 4, label: '4th year' },
      ]}
      icon={<SchoolIcon />}
    />
  </Box>
    </Box>
  );
};

export default GeneralInformation;
