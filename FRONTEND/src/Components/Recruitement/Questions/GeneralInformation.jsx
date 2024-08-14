import EmailIcon from '@mui/icons-material/Email';
import PersonIcon from '@mui/icons-material/Person';
import PhoneIcon from '@mui/icons-material/Phone';

import SchoolIcon from '@mui/icons-material/School';
import { Box, FormControl, FormControlLabel, InputAdornment, MenuItem, Radio, RadioGroup, Select, TextField, Typography } from '@mui/material';
import React from 'react';


const GeneralInformation = () => {
  return (
    <Box
      sx={{
        width: '827px',
        height: '315px', //210 
        padding: '10px',
        gap: '14px',
        display: 'flex',
        flexDirection: 'column',
        opacity: 1,
        border: '1px solid var(--neutral-50, #E9EAEB)',
      }}
    >
      <Typography 
        variant="h6" 
        sx={{
          fontFamily: 'Inter',
          fontSize: '16px',
          fontWeight: 500,
          lineHeight: '19.36px',
          textAlign: 'left',
        }}
      >
        General Information
      </Typography>

      <Box
        sx={{
          width: '807px',
          height: '72px',
          padding: '8px 0px 0px 0px',
          gap: '14px',
          opacity: 1,
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      >
        <Box
          sx={{
            width: '230px',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
          }}
        >
          <Typography 
            variant="body2" 
            sx={{
              fontFamily: 'Inter',
              fontSize: '14px',
              fontWeight: 400,
              lineHeight: '16.94px',
              textAlign: 'left',
            }}
          >
            Name
          </Typography>
          <TextField
            placeholder="Enter the candidate's name"
            sx={{
              height: '41px',
              '& .MuiInputBase-root': {
                height: '100%', 
              },
              '& .MuiInputBase-input': {
                fontFamily: 'Inter',
                fontSize: '12px',
              },
              '& .MuiFormLabel-root': {
                fontFamily: 'Inter',
                fontSize: '14px',
                fontWeight: 400,
                lineHeight: '16.94px',
                textAlign: 'left',
              },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PersonIcon />
                </InputAdornment>
              ),
            }}
          />
        </Box>

        <Box
          sx={{
            width: '250px',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
          }}
        >
          <Typography 
            variant="body2" 
            sx={{
              fontFamily: 'Inter',
              fontSize: '14px',
              fontWeight: 400,
              lineHeight: '16.94px',
              textAlign: 'left',
            }}
          >
            Last name
          </Typography>
          <TextField
            placeholder="Enter the candidate's last name"
            variant="outlined"
            sx={{
              height: '41px',
              '& .MuiInputBase-root': {
                height: '100%', 
              },
              '& .MuiInputBase-input': {
                fontFamily: 'Inter',
                fontSize: '12px',
              },
              '& .MuiFormLabel-root': {
                fontFamily: 'Inter',
                fontSize: '14px',
                fontWeight: 400,
                textAlign: 'left',
              },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PersonIcon />
                </InputAdornment>
              ),
            }}
          />
        </Box>

        <Box
          sx={{
            width: '290px',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
          }}
        >
          <Typography 
            variant="body2" 
            sx={{
              fontFamily: 'Inter',
              fontSize: '14px',
              fontWeight: 400,
              lineHeight: '16.94px',
              textAlign: 'left',
            }}
          >
            Email Address
          </Typography>
          <TextField
            placeholder="Enter the candidate's email address"
            variant="outlined"
            sx={{
              height: '41px',
              '& .MuiInputBase-root': {
                height: '100%', 
              },
              '& .MuiInputBase-input': {
                fontFamily: 'Inter',
                fontSize: '12px',
              },
              '& .MuiFormLabel-root': {
                fontFamily: 'Inter',
                fontSize: '14px',
                fontWeight: 400,
                lineHeight: '16.94px',
                textAlign: 'left',
              },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmailIcon />
                </InputAdornment>
              ),
            }}
          />
        </Box>
      </Box>

      <Box
        sx={{
          width: '807px',
          height: '72px',
          padding: '8px 0px 0px 0px',
          gap: '14px',
          opacity: 1,
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      >
        <Box
          sx={{
            width: '220px',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
          }}
        >
          <Typography 
            variant="body2" 
            sx={{
              fontFamily: 'Inter',
              fontSize: '14px',
              fontWeight: 400,
              lineHeight: '16.94px',
              textAlign: 'left',
            }}
          >
            Phone number
          </Typography>
          <TextField
            placeholder="+216"
            sx={{
              height: '41px',
              '& .MuiInputBase-root': {
                height: '100%', 
              },
              '& .MuiInputBase-input': {
                fontFamily: 'Inter',
                fontSize: '12px',
              },
              '& .MuiFormLabel-root': {
                fontFamily: 'Inter',
                fontSize: '14px',
                fontWeight: 400,
                lineHeight: '16.94px',
                textAlign: 'left',
              },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PhoneIcon />
                </InputAdornment>
              ),
            }}
          />
        </Box>

        <FormControl component="fieldset" sx={{ width: '560px', height: '56px', gap: '5px', opacity: 1 }}>
          <Typography 
            variant="subtitle1" 
            sx={{
              fontFamily: 'Inter',
              fontSize: '14px',
              fontWeight: 400,
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
            <FormControlLabel
              value="projects"
              control={
                <Radio
                  sx={{
                    '&.Mui-checked': {
                      color: '#3559E9', 
                    },
                  }}
                />
              }
              label={
                <Typography
                  sx={{
                    fontFamily: 'Inter',
                    fontSize: '12px',
                    fontWeight: 400,
                    lineHeight: '14.52px',
                    textAlign: 'center',
                  }}
                >
                  Projects
                </Typography>
              }
            />
            <FormControlLabel
              value="development_commercial"
              control={<Radio />}
              label={
                <Typography
                  sx={{
                    fontFamily: 'Inter',
                    fontSize: '12px',
                    fontWeight: 400,
                    lineHeight: '14.52px',
                    textAlign: 'center',
                  }}
                >
                  Development Commercial
                </Typography>
              }
            />
            <FormControlLabel
              value="cellule_qualite"
              control={<Radio />}
              label={
                <Typography
                  sx={{
                    fontFamily: 'Inter',
                    fontSize: '12px',
                    fontWeight: 400,
                    lineHeight: '14.52px',
                    textAlign: 'center',
                  }}
                >
                  Cellule Qualité
                </Typography>
              }
            />
            <FormControlLabel
              value="marketing"
              control={<Radio />}
              label={
                <Typography
                  sx={{
                    fontFamily: 'Inter',
                    fontSize: '12px',
                    fontWeight: 400,
                    lineHeight: '14.52px',
                    textAlign: 'center',
                  }}
                >
                  Marketing
                </Typography>
              }
            />
          </RadioGroup>
        </FormControl>
      </Box>

      <Box
        sx={{
          width: '807px',
          height: '72px',
          padding: '8px 0px 0px 0px',
          gap: '14px',
          opacity: 1,
          display: 'flex',
          flexDirection: 'row',
          //justifyContent: 'space-between',
        }}
      >
      <Box
        sx={{
          width: '230px',
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
        }}
      >
        <Typography 
          variant="body2" 
          sx={{
            fontFamily: 'Inter',
            fontSize: '14px',
            fontWeight: 400,
            lineHeight: '16.94px',
            textAlign: 'left',
          }}
        >
          Field
        </Typography>
        <Select
          displayEmpty
          placeholder="Select the candidate's field"
          sx={{
            height: '41px',
          
           
            '& .MuiInputBase-root': {
              height: '100%',
            },
            '& .MuiInputBase-input': {
              fontFamily: 'Inter',
              fontSize: '12px',
            },
          }}
          startAdornment={
            <InputAdornment position="start">

              <SchoolIcon />
              

            </InputAdornment>
          }
        >
          <MenuItem value="" disabled>
            Select the candidate's field
          </MenuItem>
          <MenuItem value="">MPI</MenuItem>
          <MenuItem value="">CBA</MenuItem>
          <MenuItem value="">GL</MenuItem>
          <MenuItem value="">RT</MenuItem>
          <MenuItem value="">IIA</MenuItem>
          <MenuItem value="">IMI</MenuItem>
          <MenuItem value="">CH</MenuItem>
          <MenuItem value="">BIO</MenuItem>




        </Select>
      </Box>

      <Box
        sx={{
          width: '250px',
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
        }}
      >
        <Typography 
          variant="body2" 
          sx={{
            fontFamily: 'Inter',
            fontSize: '14px',
            fontWeight: 400,
            lineHeight: '16.94px',
            textAlign: 'left',
          }}
        >
          Academic year
        </Typography>
        <Select
          //displayEmpty
          //placeholder="Select the candidate's year"
          sx={{
            height: '41px',
            '& .MuiInputBase-root': {
              height: '100%',
            },
            '& .MuiInputBase-input': {
              fontFamily: 'Inter',
              fontSize: '12px',
            },
          }}
          startAdornment={
            <InputAdornment position="start">
              <SchoolIcon />
            </InputAdornment>
          }
        >
          <MenuItem value="" disabled>
            Select the candidate's academic year
          </MenuItem>
          <MenuItem value="2021">1st year</MenuItem>
          <MenuItem value="2022">2nd year</MenuItem>
          <MenuItem value="2023">3rd year</MenuItem>
          <MenuItem value="2024">4th year</MenuItem>
        </Select>
      </Box>
      </Box>
    </Box>
  );
};

export default GeneralInformation;
